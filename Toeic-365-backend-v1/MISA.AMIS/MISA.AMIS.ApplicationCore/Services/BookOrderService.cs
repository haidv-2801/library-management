using ClosedXML.Excel;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.Entities;
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
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public class BookOrderService : BaseService<BookOrder>, IBookOrderService
    {
        #region Declare
        IBookOrderRepository _bookOrderRepository;
        IBookService _bookService;
        #endregion

        #region Constructer
        public BookOrderService(IBookOrderRepository bookRepository, IBookService bookService) : base(bookRepository)
        {
            _bookOrderRepository = bookRepository;
            _bookService = bookService;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Validate tùy chỉn theo màn hình nhân viên
        /// </summary>
        /// <param name="entity">Thực thể nhân viên</param>
        /// <returns>(true-false)</returns>
        protected override bool ValidateCustom(BookOrder book)
        {
            bool isValid = true;

            //1. Đọc các property
            var properties = book.GetType().GetProperties();

            foreach (var property in properties)
            {
                if (isValid && property.IsDefined(typeof(IDuplicate), false))
                {
                    //1.1 Check trùng
                    isValid = ValidateDuplicate(book, property);
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
        private bool ValidateDuplicate(BookOrder book, PropertyInfo propertyInfo)
        {
            bool isValid = true;

            //1. Tên trường
            var propertyName = propertyInfo.Name;

            //2. Tên hiển thị
            var propertyDisplayName = GetAttributeDisplayName(propertyName);

            //3. Tùy chỉnh nguồn dữ liệu để validate, trạng thái thêm hoắc sửa
            var entityDuplicate = _bookOrderRepository.GetEntityByProperty(book, propertyInfo);

            if (entityDuplicate != null)
            {
                isValid = false;

                _serviceResult.TOECode = TOECode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_NotValid;
                _serviceResult.Data = string.Format(Properties.Resources.Msg_Duplicate, propertyDisplayName);
            }

            return isValid;
        }

        public async Task<ServiceResult> InsertBookOrder(BookOrder bookOrder)
        {
            var bookOrderInformations = (List<BookOrderInformationDTO>)JsonConvert.DeserializeObject<List<BookOrderInformationDTO>>(bookOrder.BookOrderInfomation);
            var validationMessages = new List<string>();
            var bookIDs = bookOrderInformations.Select(book => book.id).ToList();
            var query = "SELECT * FROM BOOK WHERE BookID IN";
            if (bookIDs.Count > 0)
            {
                query += string.Format(" ({0}) ", string.Join(",", bookIDs));
            }
            else
            {
                _serviceResult.Data = 0;
                _serviceResult.TOECode = TOECode.Fail;
                _serviceResult.Messasge = "Danh sách id đầu vào trống.";
                return _serviceResult;
            }

            var listBookByIDS = (List<BookItem>)await _bookOrderRepository.QueryUsingCommandTextAsync(query);
            if (listBookByIDS.Count < bookOrderInformations.Count)
            {
                _serviceResult.Data = 0;
                _serviceResult.TOECode = TOECode.Fail;
                _serviceResult.Messasge = "Số lượng sách hiện có nhỏ hơn đầu vào.";
                return _serviceResult;
            }

            if (listBookByIDS.Any(book => book.Amount == 0 || book.Available == 0 || book.Reserved == book.Amount))
            {
                _serviceResult.Data = 0;
                _serviceResult.TOECode = TOECode.Fail;
                _serviceResult.Messasge = "Một trong số những sách đã chọn không có sẵn.";
                return _serviceResult;
            }

            int rowEffects = _bookOrderRepository.Insert(bookOrder);
            if (rowEffects > 0)
            {
                _serviceResult.Data = bookOrder.BookOrderID;
                _serviceResult.TOECode = TOECode.Success;
                _serviceResult.Messasge = "Thêm mới thành công.";
            }
            else
            {
                _serviceResult.Data = 0;
                _serviceResult.TOECode = TOECode.Fail;
                _serviceResult.Messasge = "Thêm mới thất bại.";
            }

            return _serviceResult;
        }
        #endregion
    }
}
