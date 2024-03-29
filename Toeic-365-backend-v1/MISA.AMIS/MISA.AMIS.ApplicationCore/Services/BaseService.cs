﻿using Microsoft.AspNetCore.Http;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TOE.TOEIC.ApplicationCore.Helpers;
using System.Text.Json;
using System.Web;
using TOE.TOEIC.ApplicationCore.Enums;

namespace TOE.TOEIC.ApplicationCore
{
    /// <summary>
    /// Service dùng chung
    /// </summary>
    /// <typeparam name="TEntity">Loại thực thể</typeparam>
    /// CREATED BY: DVHAI (11/07/2021)
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : BaseEntity
    {
        #region Declare
        IBaseRepository<TEntity> _baseRepository;
        protected ServiceResult _serviceResult = null;
        #endregion

        #region Constructer
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult()
            {
                Data = null,
                TOECode = TOECode.Success,
                Messasge = Properties.Resources.Msg_Success,
            };
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy tất cả bản ghi
        /// </summary>
        /// <returns>Danh sách bản ghi</returns>
        /// CREATED BY: DVHAI 11/07/2021
        public IEnumerable<TEntity> GetEntities()
        {
            var entities = _baseRepository.GetEntities();
            return entities;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pagingRequest"></param>
        /// <returns></returns>
        public ServiceResult GetEntitiesFilter(PagingRequest pagingRequest)
        {

            StringBuilder stringBuilder = new StringBuilder();
            var filter = JsonConvert.DeserializeObject<JArray>(FunctionHelper.Base64Decode(pagingRequest.Filter));
            List<string> columns = null;

            if (filter != null && filter.Type == JTokenType.Array)
            {
                BuildFilterClause(ref stringBuilder, filter);
            }
            else
            {
                stringBuilder.Append(" 1 = 1 ");
            }

            int totalRecord = _baseRepository.CountTotalRecordByClause(stringBuilder.ToString());


            if (!string.IsNullOrEmpty(pagingRequest.Sort))
            {
                var sort = JsonConvert.DeserializeObject<JArray>((pagingRequest.Sort));
                if (sort != null && sort.Type == JTokenType.Array)
                {
                    stringBuilder.Append(" ORDER BY ");
                    var listSort = new List<string>();

                    foreach (var item in sort)
                    {
                        if (item.Type == JTokenType.Array)
                        {
                            string name = item[0].Value<string>().Trim();
                            string sortType = item[1].Value<string>().Trim();
                            if (!string.IsNullOrEmpty(name) && (sortType == SortType.ASC || sortType == SortType.DESC))
                            {
                                listSort.Add($"{name} {sortType}");
                            }
                        }
                    }

                    stringBuilder.Append(string.Join(", ", listSort));
                }

            }

            if (pagingRequest.PageIndex > 0 && pagingRequest.PageSize > 0)
            {
                stringBuilder.Append($" LIMIT {pagingRequest.PageSize} OFFSET {pagingRequest.PageSize * (pagingRequest.PageIndex - 1)}");
            }

            if (!string.IsNullOrEmpty(pagingRequest.Columns))
            {
                columns = pagingRequest.Columns.Split(",".ToCharArray()).Select(item => item.Trim()).ToList();
            }

            if (totalRecord > 0)
            {
                string cols = columns == null ? "*" : string.Join(", ", columns);
                var data = _baseRepository.GetEntitiesFilter(stringBuilder.ToString(), cols);

                _serviceResult.Data = new
                {
                    totalRecord = totalRecord,
                    totalPage = totalRecord % pagingRequest.PageSize == 0 ? (totalRecord / pagingRequest.PageSize) : (totalRecord / pagingRequest.PageSize) + 1,
                    pageSize = pagingRequest.PageSize,
                    pageNumber = pagingRequest.PageIndex,
                    pageData = data
                };
            }
            else
            {
                _serviceResult.Data = new
                {
                    totalRecord = totalRecord,
                    totalPage = 0,
                    pageSize = pagingRequest.PageSize,
                    pageNumber = pagingRequest.PageIndex,
                    pageData = new List<TEntity>()
                };
            }

            return _serviceResult;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="stringBuilder"></param>
        /// <param name="plainData"></param>
        public void BuildFilterClause(ref StringBuilder stringBuilder, JToken plainData)
        {
            if (plainData.Type == JTokenType.Array)
            {
                stringBuilder.Append(" ( ");

                JArray arr = ((JArray)plainData);
                if (arr.Count == 3 && !arr.Any<JToken>(item => item.Type == JTokenType.Array))
                {
                    string name = arr[0].Value<string>();
                    string opt = arr[1].Value<string>();
                    object value = HttpUtility.UrlDecode(arr[2].Value<string>());
                    stringBuilder.Append(BuildSingleOperator(name, opt, value));
                }
                else
                {
                    foreach (var jtoken in arr)
                    {
                        BuildFilterClause(ref stringBuilder, jtoken);
                    }
                }
                stringBuilder.Append(" ) ");
            }
            else if (plainData.Type == JTokenType.String)
            {
                if (string.Compare(plainData.Value<string>(), "and", true) == 0)
                {
                    stringBuilder.Append(" AND ");
                }
                else if (string.Compare(plainData.Value<string>(), "or", true) == 0)
                {
                    stringBuilder.Append(" OR ");
                }
            }
        }

        /// <summary>
        /// Lấy bản ghi theo Id
        /// </summary>
        /// <param name="entityId">Id của bản ghi</param>
        /// <returns>Bản ghi duy nhất</returns>
        /// CREATED BY: DVHAI (11/07/2021)
        public TEntity GetEntityById(Guid entityId)
        {
            var entity = _baseRepository.GetEntityById(entityId);
            return entity;
        }

        /// <summary>
        /// Thêm một thực thể
        /// </summary>
        /// <param name="entity">Thực thể cần thêm</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CREATED BY: DVHAI (11/07/2021)
        public virtual ServiceResult Insert(TEntity entity)
        {
            //0.Custom lại giá trị khi update
            entity = CustomValueWhenInsert(entity);

            entity.EntityState = EntityState.Add;

            //1. Validate tất cả các trường nếu được gắn thẻ
            var isValid = Validate(entity);

            //2. Sử lí lỗi tương ứng
            if (isValid)
            {
                int rowAffects = _baseRepository.Insert(entity);
                if (rowAffects == 0)
                {
                    _serviceResult.TOECode = TOECode.Fail;
                    _serviceResult.Messasge = Properties.Resources.Msg_Failed;
                } else { _serviceResult.Data = rowAffects; }
            }
            else
            {
                _serviceResult.TOECode = TOECode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_NotValid;
            }

            //3. Trả về kế quả
            return _serviceResult;
        }

        /// <summary>
        /// Cập nhập thông tin bản ghi 
        /// </summary>
        /// <param name="entityId">Id bản ghi</param>
        /// <param name="entity">Thông tin bản ghi</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CREATED BY: DVHAI (11/07/2021)
        public ServiceResult Update(Guid entityId, TEntity entity)
        {
            //0.Custom lại giá trị khi update
            entity = CustomValueWhenUpdate(entity);

            //1. Trạng thái
            entity.EntityState = EntityState.Update;

            //2. Validate tất cả các trường nếu được gắn thẻ
            var isValid = Validate(entity);
            if (isValid)
            {
                int rowAffects = _baseRepository.Update(entityId, entity);
                _serviceResult.Data = rowAffects;
                if (rowAffects > 0)
                {
                    _serviceResult.TOECode = TOECode.Valid;
                    _serviceResult.Messasge = Properties.Resources.Msg_Success;
                }
                else
                {
                    _serviceResult.TOECode = TOECode.InValid;
                    _serviceResult.Messasge = Properties.Resources.Msg_Failed;
                }
            }
            else
            {
                _serviceResult.TOECode = TOECode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_NotValid;
            }
            //3. Trả về kế quả
            return _serviceResult;
        }

        /// <summary>
        /// Xóa bản ghi theo id
        /// </summary>
        /// <param name="entityId">Id bản ghi</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CREATED BY: DVHAI (11/07/2021)
        public ServiceResult Delete(Guid entityId)
        {
            int rowAffects = _baseRepository.Delete(entityId);
            _serviceResult.Data = rowAffects;

            if (rowAffects > 0)
            {
                _serviceResult.TOECode = TOECode.Success;
                _serviceResult.Messasge = Properties.Resources.Msg_Success;
            }
            else
            {
                _serviceResult.TOECode = TOECode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_Failed;
            }

            return _serviceResult;
        }

        /// <summary>
        /// Validate tất cả
        /// </summary>
        /// <param name="entity">Thực thể</param>
        /// <returns>(true-đúng false-sai)</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        private bool Validate(TEntity entity)
        {
            var isValid = true;

            //1. Đọc các property
            var properties = entity.GetType().GetProperties();

            foreach (var property in properties)
            {
                //1.1 Kiểm tra xem  có attribute cần phải validate không
                if (isValid && property.IsDefined(typeof(IRequired), false))
                {
                    //1.1.1 Check bắt buộc nhập
                    isValid = ValidateRequired(entity, property);
                }
            }

            //2. Validate tùy chỉnh từng màn hình
            if (isValid)
            {
                isValid = ValidateCustom(entity);
            }

            return isValid;
        }

        /// <summary>
        /// Validate từng màn hình
        /// </summary>
        /// <param name="entity">Thực thể</param>
        /// CREATED BY: DVHAI (07/07/2021)
        protected virtual bool ValidateCustom(TEntity entity)
        {
            return true;
        }

        /// <summary>
        /// Custom lại value khi update
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        protected virtual TEntity CustomValueWhenUpdate(TEntity entity)
        {
            return entity;
        }

        /// <summary>
        /// Custom lại value khi insert
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        protected virtual TEntity CustomValueWhenInsert(TEntity entity)
        {
            return entity;
        }

        /// <summary>
        /// Validate bắt buộc nhập
        /// </summary>
        /// <param name="entity">Thực thể</param>
        /// <param name="propertyInfo">Thuộc tính của thực thể</param>
        /// <returns>(true-đúng false-sai)</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        private bool ValidateRequired(TEntity entity, PropertyInfo propertyInfo)
        {
            bool isValid = true;

            //1. Tên trường
            var propertyName = propertyInfo.Name;

            //2. Giấ trị
            var propertyValue = propertyInfo.GetValue(entity);

            //3. Tên hiển thị
            var propertyDisplayName = GetAttributeDisplayName(propertyName);

            if (string.IsNullOrEmpty(propertyValue.ToString()))
            {
                isValid = false;

                _serviceResult.TOECode = TOECode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_NotValid;
                _serviceResult.Data = string.Format(Properties.Resources.Msg_Required, propertyDisplayName);
            }

            return isValid;
        }

        /// <summary>
        /// Lấy tên hiển thị của trường trong entity
        /// </summary>
        /// <param name="attributeName">Tên thuộc tính</param>
        /// <returns>Tên hiển thị</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        protected String GetAttributeDisplayName(string attributeName)
        {
            //Gán mặc định bằng tên thuộc tính
            var res = attributeName;
            try
            {
                res = typeof(TEntity).GetProperty(attributeName).GetCustomAttributes(typeof(DisplayAttribute),
                                               false).Cast<DisplayAttribute>().Single().Name;
            }
            catch { }
            return res;
        }

        /// <summary>
        /// Trả về dữ liệu với kiểu dữ liệu truyền vào
        /// </summary>
        /// <param name="type">Kiểu dữ liệu</param>
        /// <param name="value">Giá trị kiểu string</param>
        /// <returns>Kiểu dữ liệu động</returns>
        protected dynamic convertValue(Type type, string value)
        {
            dynamic res = null;

            if (string.IsNullOrEmpty(value))
                return res;

            //Lấy ra kiểu dữ liệu chuẩn
            if (type.Name == "Nullable`1")
            {
                type = Nullable.GetUnderlyingType(type);
                if (type.Name == "DateTime")
                    value = String.Join("-", value.Split('/').Reverse());
            }
            res = Convert.ChangeType(value, type);

            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="column"></param>
        /// <param name="optr"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        private string BuildSingleOperator(string column, string optr, object value)
        {
            StringBuilder stringBuilder = new StringBuilder(column);
            FormatValueSql(ref value);

            if (optr == Operator.EQUAL)
            {
                stringBuilder.Append($" {Operator.EQUAL} ");
                stringBuilder.Append(value);
            }
            else if (optr == Operator.CONTAINS)
            {
                stringBuilder.Append($" LIKE CONCAT('%',{value},'%')");
            }
            else if (optr == Operator.START_WIDTH)
            {
                stringBuilder.Append($" LIKE CONCAT({value},'%')");
            }
            else if (optr == Operator.END_WIDTH)
            {
                stringBuilder.Append($" LIKE CONCAT('%',{value})");
            }
            else if (optr == Operator.NOT_EQUAL)
            {
                stringBuilder.Append($" {Operator.NOT_EQUAL} {value}");
            }

            return stringBuilder.ToString();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        private void FormatValueSql(ref object value)
        {
            if (value.GetType() == typeof(string))
            {
                value = $"'{SecureHelper.SafeSqlLiteralForStringValue(value.ToString())}'";
            }
            else if (value.GetType() == typeof(TimeSpan))
            {
                value = $"'{((TimeSpan)value).ToString("HH:mm:ss")}'";
            }
            else if (value.GetType() == typeof(DateTime))
            {
                value = $"'{((DateTime)value).ToString("yyyy-MM-dd HH:mm:ss")}'";
            }
            else if (value.GetType() == typeof(int) || value.GetType() == typeof(decimal) || value.GetType() == typeof(double))
            {
                value = value.ToString();
            }
            else if (value.GetType() == typeof(bool))
            {
                value = ((bool)value) ? "TRUE" : "FALSE";
            }
            else if (value.GetType() == typeof(Guid))
            {
                value = $"'{((Guid)value).ToString()}'";
            }
        }

        #endregion
    }
}
