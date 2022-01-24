using ClosedXML.Excel;
using MISA.AMIS.ApplicationCoore.Entities;
using MISA.AMIS.ApplicationCore.Entities;
using MISA.AMIS.ApplicationCore.Interfaces;
using MISA.AMIS.Entities;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;

namespace MISA.AMIS.ApplicationCore.Interfaces
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        #region Declare
        IEmployeeRepository _employeeRepository;
        #endregion

        #region Constructer
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy mã mới nhất của nhân viên cộng với 1
        /// </summary>
        /// <returns>Mã nhân viên</returns>
        ///CREATED BY: HAIDV 09/07/2021
        public string GetNewEmployeeCode()
        {
            var employeeCode = _employeeRepository.GetNewEmployeeCode();
            try
            {
                employeeCode = NextEmployeeCode(employeeCode);
            }
            catch (Exception) { }

            return employeeCode;
        }

        /// <summary>
        /// Lấy nhân viên theo mã
        /// </summary>
        /// <returns>Nhân viên</returns>
        /// CREATED BY: HAIDV 09/07/2021
        public Employee GetEmployeeByCode(string employeeCode)
        {
            return _employeeRepository.GetEmployeeByCode(employeeCode);
        }

        /// <summary>
        /// Tính toán mã nhân viên mới nhất
        /// </summary>
        /// <param name="employeeCode">Mã cũ</param>
        /// <returns></returns>
        private string NextEmployeeCode(string employeeCode)
        {
            //1. Tìm vị trí của chữ số đầu tiên
            int firstDigitIndex = employeeCode.IndexOfAny(new char[]
                { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' });

            //2. Lấy ra tiền tố của mã nhân viên
            string prefix = employeeCode.Substring(0, firstDigitIndex);

            //3. Só tiếp theo
            string nextNum = (int.Parse(employeeCode.Substring(firstDigitIndex)) + 1).ToString();
           
            //4. Nối
            return string.Concat(prefix, nextNum);
        }

        /// <summary>
        /// Lấy danh sách nhân viên phân trang, tìm kiếm
        /// </summary>
        /// <param name="filterValue">Giá trị tìm kiếm</param>
        /// <param name="pageSize">Số bản ghi trên 1 trang</param>
        /// <param name="offset">Số trang</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        public ServiceResult GetEmployeesFilterPaging(string filterValue, int pageSize, int pageNumber)
        {
            //.1 Lấy danh sách nhân viên phân trang
            var employeeFilterPaging = _employeeRepository.GetEmployeesFilterPaging(filterValue, pageSize, pageNumber).ToList();
            
            //2. Lấy tổng số bản ghi
            int totalRecord = _employeeRepository.GetTotalEmployeeFilter(filterValue);

            //3. Trả về kết quả tính toán
            _serviceResult.Data = new
            {
                totalRecord = totalRecord,
                totalPage = totalRecord % pageSize == 0 ? (totalRecord / pageSize) : (totalRecord / pageSize) + 1,
                pageSize = pageSize,
                pageNumber = pageNumber,
                data = employeeFilterPaging
            };

            return _serviceResult;
        }

        /// <summary>
        /// Validate tùy chỉn theo màn hình nhân viên
        /// </summary>
        /// <param name="entity">Thực thể nhân viên</param>
        /// <returns>(true-false)</returns>
        protected override bool ValidateCustom(Employee employee)
        {
            bool isValid = true;

            //1. Đọc các property
            var properties = employee.GetType().GetProperties();

            foreach (var property in properties)
            {
                if (isValid && property.IsDefined(typeof(IDuplicate), false))
                {
                    //1.1 Check trùng
                    isValid = ValidateDuplicate(employee, property);
                }

                if (isValid && property.IsDefined(typeof(IEmailFormat), false))
                {
                    //1.2 Kiểm tra định dạng email
                    isValid = ValidateEmail(employee, property);
                }
            }
            return isValid;
        }

        /// <summary>
        /// Validate trùng
        /// </summary>
        /// <param name="entity">Thực thể</param>
        /// <param name="propertyInfo">Thuộc tính của thực thể</param>
        /// <returns>(true-đúng false-sai)</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        private bool ValidateDuplicate(Employee employee, PropertyInfo propertyInfo)
        {
            bool isValid = true;

            //1. Tên trường
            var propertyName = propertyInfo.Name;

            //2. Tên hiển thị
            var propertyDisplayName = GetAttributeDisplayName(propertyName);

            //3. Tùy chỉnh nguồn dữ liệu để validate, trạng thái thêm hoắc sửa
            var entityDuplicate = _employeeRepository.GetEntityByProperty(employee, propertyInfo);

            if (entityDuplicate != null)
            {
                isValid = false;

                _serviceResult.MISACode = MISACode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_NotValid;
                _serviceResult.Data = string.Format(Properties.Resources.Msg_Duplicate, propertyDisplayName);
            }

            return isValid;
        }

        /// <summary>
        /// Validate định dạng email
        /// </summary>
        /// <param name="employee"></param>
        /// <param name="propertyInfo"></param>
        /// <returns>(true-đúng false-sai)</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        private bool ValidateEmail(Employee employee, PropertyInfo propertyInfo)
        {
            bool isValid = true;

            //1. Tên trường
            var propertyName = propertyInfo.Name;

            //2. Tên hiển thị
            var propertyDisplayName = GetAttributeDisplayName(propertyName);

            //3. Gía trị
            var value = propertyInfo.GetValue(employee);

            //Không validate required
            if (string.IsNullOrEmpty(value.ToString()))
                return isValid;


            isValid = new EmailAddressAttribute().IsValid(value.ToString());
            //4. Gán message lỗi
            if (!isValid)
            {
                _serviceResult.MISACode = MISACode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_NotValid;
                _serviceResult.Data = string.Format(Properties.Resources.Msg_NotFormat, propertyDisplayName);
            }

            return isValid;
        }

        /// <summary>
        /// Xuất excel theo những bản ghi được tìm kiếm
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <param name="filterValue">Giá trị lọc</param>
        /// <returns></returns>
        /// CREATED BY: DVHAI (07/07/2021)
        /// <summary>
        public MemoryStream Export(CancellationToken cancellationToken, string filterValue)
        {
            //Lấy ra danh sách nhân viên
            List<Employee> employees = _employeeRepository.GetEmployeesFilterPaging(filterValue: filterValue).ToList();

            //Lấy ra danh sách cột cần xuất khẩu
            List<ExportColumn> exportColumns = _employeeRepository.GetExportColumns().ToList();

            var stream = new MemoryStream();
            using (var package = new ExcelPackage(stream))
            {
                //1. Đặt tên cho worksheet
                var worksheet = package.Workbook.Worksheets.Add("Danh sách nhân viên");
               
                //Chỉnh header của excel
                worksheet.Cells[3, 1].Value = "STT";
                worksheet.Cells[3, 1].Style.Font.Bold = true;
                worksheet.Cells[3, 1].Style.Fill.SetBackground(Color.LightGray);
                worksheet.Cells[3, 1].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[3, 1].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[3, 1].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[3, 1].Style.Border.Left.Color.SetColor(Color.Black);
                worksheet.Cells[3, 1].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[3, 1].Style.Border.Right.Color.SetColor(Color.Black);
                worksheet.Cells[3, 1].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[3, 1].Style.Border.Bottom.Color.SetColor(Color.Black);

                //2. Ánh xạ giá trị vào header
                for (int i = 1; i < exportColumns.Count; i++)
                {
                    if (exportColumns[i - 1].FieldName == "DateOfBirth")
                    {
                        worksheet.Column(i + 1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    }
                    worksheet.Cells[3, i + 1].Value = exportColumns[i - 1].DisplayName;
                    worksheet.Cells[3, i + 1].Style.Font.Bold = true;
                    worksheet.Cells[3, i + 1].Style.Fill.SetBackground(Color.LightGray);
                    worksheet.Cells[3, i + 1].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[3, i + 1].Style.Border.Top.Color.SetColor(Color.Black);
                    worksheet.Cells[3, i + 1].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[3, i + 1].Style.Border.Left.Color.SetColor(Color.Black);
                    worksheet.Cells[3, i + 1].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[3, i + 1].Style.Border.Right.Color.SetColor(Color.Black);
                    worksheet.Cells[3, i + 1].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[3, i + 1].Style.Border.Bottom.Color.SetColor(Color.Black);
                    worksheet.Column(i + 1).Width = exportColumns[i - 1].Width;
                }


                //3. Màu header
                for (int index = 1; index <= employees.Count; index++)
                {
                    //Màu header
                    worksheet.Cells[index + 3, 1].Value = index;
                    worksheet.Cells[index + 3, 1].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[index + 3, 1].Style.Border.Top.Color.SetColor(Color.Black);
                    worksheet.Cells[index + 3, 1].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[index + 3, 1].Style.Border.Left.Color.SetColor(Color.Black);
                    worksheet.Cells[index + 3, 1].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[index + 3, 1].Style.Border.Right.Color.SetColor(Color.Black);
                    worksheet.Cells[index + 3, 1].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[index + 3, 1].Style.Border.Bottom.Color.SetColor(Color.Black);
                    for (int i = 1; i < exportColumns.Count; i++)
                    {
                        //Màu border
                        worksheet.Cells[index + 3, i + 1].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[index + 3, i + 1].Style.Border.Top.Color.SetColor(Color.Black);
                        worksheet.Cells[index + 3, i + 1].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[index + 3, i + 1].Style.Border.Left.Color.SetColor(Color.Black);
                        worksheet.Cells[index + 3, i + 1].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[index + 3, i + 1].Style.Border.Right.Color.SetColor(Color.Black);
                        worksheet.Cells[index + 3, i + 1].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[index + 3, i + 1].Style.Border.Bottom.Color.SetColor(Color.Black);
                        //Xử lý trường hợp là giới tính
                        if (exportColumns[i - 1].FieldName == "Gender")
                        {
                            if (GetValueByProperty(employees[index - 1], exportColumns[i - 1].FieldName) is null)
                            {
                                worksheet.Cells[index + 3, i + 1].Value = "";
                                continue;
                            }
                            switch (int.Parse(GetValueByProperty(employees[index - 1], exportColumns[i - 1].FieldName).ToString()))
                            {
                                case 0:
                                    worksheet.Cells[index + 3, i + 1].Value = "Nam";
                                    break;
                                case 1:
                                    worksheet.Cells[index + 3, i + 1].Value = "Nữ";
                                    break;
                                case 2:
                                    worksheet.Cells[index + 3, i + 1].Value = "Khác";
                                    break;
                                default:
                                    worksheet.Cells[index + 3, i + 1].Value = "";
                                    break;
                            }
                            continue;
                        }
                        worksheet.Cells[index + 3, i + 1].Value = GetValueByProperty(employees[index - 1], exportColumns[i - 1].FieldName);
                    }
                }
                worksheet.Cells["A1:J1"].Merge = true;
                worksheet.Cells[1, 1].Value = "DANH SÁCH NHÂN VIÊN";
                worksheet.Cells[1, 1].Style.Font.Size = 16;
                worksheet.Cells[1, 1].Style.Font.Bold = true;
                worksheet.Cells[1, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                worksheet.Cells[1, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A2:J2"].Merge = true;

                package.Save();
            }
            stream.Position = 0;
            return stream;
        }

        /// <summary>
        /// Lấy giá trị theo tên thuộc tíh
        /// </summary>
        /// <param name="employee">Thông tin nhân viên</param>
        /// <param name="propName">Tên thuộc tính</param>
        /// <returns>Giá trị</returns>
        /// CREATED BY: DVHAI (12/07/2021)
        private object GetValueByProperty(Employee employee, string propName)
        {
            var propertyInfo = employee.GetType().GetProperty(propName);

            //Trường hợp là datetime thì format lại
            if (propertyInfo.PropertyType == typeof(DateTime) || propertyInfo.PropertyType == typeof(DateTime?))
            {
                var value = propertyInfo.GetValue(employee, null);
                var date = Convert.ToDateTime(value).ToString("dd/MM/yyyy");

                return value != null ? date : "";
            }

            return propertyInfo.GetValue(employee, null);
        }
        #endregion
    }
}
