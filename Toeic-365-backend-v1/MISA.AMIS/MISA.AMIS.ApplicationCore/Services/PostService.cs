﻿using ClosedXML.Excel;
using TOE.TOEIC.ApplicationCore.Entities;
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

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public class PostService : BaseService<Post>, IPostService
    {
        #region Declare
        IPostRepository _postRepository;
        #endregion

        #region Constructer
        public PostService(IPostRepository postRepository) : base(postRepository)
        {
            _postRepository = postRepository;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy danh sách nhân viên phân trang, tìm kiếm
        /// </summary>
        /// <param name="filterValue">Giá trị tìm kiếm</param>
        /// <param name="pageSize">Số bản ghi trên 1 trang</param>
        /// <param name="offset">Số trang</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        public ServiceResult GetPostsFilterPaging(string filterValue, int pageSize, int pageNumber)
        {
            //.1 Lấy danh sách nhân viên phân trang
            var postDbResponse = (DbResponse)_postRepository.GetPostsFilterPaging(filterValue, pageSize, pageNumber);

            //2. Lấy tổng số bản ghi
            long totalRecord = postDbResponse.TotalRecords;

            //3. Trả về kết quả tính toán
            _serviceResult.Data = new
            {
                totalRecord = totalRecord,
                totalPage = totalRecord % pageSize == 0 ? (totalRecord / pageSize) : (totalRecord / pageSize) + 1,
                pageSize = pageSize,
                pageNumber = pageNumber,
                pageData = postDbResponse.Data
            };

            return _serviceResult;
        }

        /// <summary>
        /// Validate tùy chỉn theo màn hình nhân viên
        /// </summary>
        /// <param name="entity">Thực thể nhân viên</param>
        /// <returns>(true-false)</returns>
        protected override bool ValidateCustom(Post post)
        {
            bool isValid = true;

            //1. Đọc các property
            var properties = post.GetType().GetProperties();

            foreach (var property in properties)
            {
                if (isValid && property.IsDefined(typeof(IDuplicate), false))
                {
                    //1.1 Check trùng
                    isValid = ValidateDuplicate(post, property);
                }

                if (isValid && property.IsDefined(typeof(IEmailFormat), false))
                {
                    //1.2 Kiểm tra định dạng email
                    isValid = ValidateEmail(post, property);
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
        private bool ValidateDuplicate(Post post, PropertyInfo propertyInfo)
        {
            bool isValid = true;

            //1. Tên trường
            var propertyName = propertyInfo.Name;

            //2. Tên hiển thị
            var propertyDisplayName = GetAttributeDisplayName(propertyName);

            //3. Tùy chỉnh nguồn dữ liệu để validate, trạng thái thêm hoắc sửa
            var entityDuplicate = _postRepository.GetEntityByProperty(post, propertyInfo);

            if (entityDuplicate != null)
            {
                isValid = false;

                _serviceResult.TOECode = TOECode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_NotValid;
                _serviceResult.Data = string.Format(Properties.Resources.Msg_Duplicate, propertyDisplayName);
            }

            return isValid;
        }

        /// <summary>
        /// Validate định dạng email
        /// </summary>
        /// <param name="post"></param>
        /// <param name="propertyInfo"></param>
        /// <returns>(true-đúng false-sai)</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        private bool ValidateEmail(Post post, PropertyInfo propertyInfo)
        {
            bool isValid = true;

            //1. Tên trường
            var propertyName = propertyInfo.Name;

            //2. Tên hiển thị
            var propertyDisplayName = GetAttributeDisplayName(propertyName);

            //3. Gía trị
            var value = propertyInfo.GetValue(post);

            //Không validate required
            if (string.IsNullOrEmpty(value.ToString()))
                return isValid;


            isValid = new EmailAddressAttribute().IsValid(value.ToString());
            //4. Gán message lỗi
            if (!isValid)
            {
                _serviceResult.TOECode = TOECode.InValid;
                _serviceResult.Messasge = Properties.Resources.Msg_NotValid;
                _serviceResult.Data = string.Format(Properties.Resources.Msg_NotFormat, propertyDisplayName);
            }

            return isValid;
        }

        /// <summary>
        /// Lấy giá trị theo tên thuộc tíh
        /// </summary>
        /// <param name="post">Thông tin nhân viên</param>
        /// <param name="propName">Tên thuộc tính</param>
        /// <returns>Giá trị</returns>
        /// CREATED BY: DVHAI (12/07/2021)
        private object GetValueByProperty(Post post, string propName)
        {
            var propertyInfo = post.GetType().GetProperty(propName);

            //Trường hợp là datetime thì format lại
            if (propertyInfo.PropertyType == typeof(DateTime) || propertyInfo.PropertyType == typeof(DateTime?))
            {
                var value = propertyInfo.GetValue(post, null);
                var date = Convert.ToDateTime(value).ToString("dd/MM/yyyy");

                return value != null ? date : "";
            }

            return propertyInfo.GetValue(post, null);
        }

        /// <summary>
        /// Lấy danh sách post theo menuid
        /// </summary>
        /// <param name="MenuID"></param>
        /// <returns></returns>
        public ServiceResult GetPostsByMenuID(Guid? MenuID)
        {
            _serviceResult.Data = _postRepository.GetEntitiesByProperty("MenuID", MenuID.ToString());
            _serviceResult.TOECode = TOECode.Success;
            return _serviceResult;
        }

        //public async Task SaveSingleAsync(Post post)
        //{
        //    if (_cache.Any(p => p.PostID == post.PostID))
        //    {
        //        await _elasticClient.UpdateAsync<Post>(post, u => u.Doc(post));
        //    }
        //    else
        //    {
        //        _cache.Add(post);
        //        await _elasticClient.IndexDocumentAsync(post);
        //    }
        //}

        //public async Task SaveManyAsync(Post[] posts)
        //{
        //    _cache.AddRange(posts);
        //    var result = await _elasticClient.IndexManyAsync(posts);
        //    if (result.Errors)
        //    {
        //        // the response can be inspected for errors
        //        foreach (var itemWithError in result.ItemsWithErrors)
        //        {
        //            //_logger.LogError("Failed to index document {0}: {1}",
        //            //    itemWithError.PostID, itemWithError.Error);
        //        }
        //    }
        //}

        //public async Task SaveBulkAsync(Post[] posts)
        //{
        //    _cache.AddRange(posts);
        //    var result = await _elasticClient.BulkAsync(b => b.Index("posts").IndexMany(posts));
        //    if (result.Errors)
        //    {
        //        // the response can be inspected for errors
        //        foreach (var itemWithError in result.ItemsWithErrors)
        //        {
        //            //_logger.LogError("Failed to index document {0}: {1}",
        //            //    itemWithError.PostID, itemWithError.Error);
        //        }
        //    }
        //}

        //public async Task DeleteAsync(Post post)
        //{
        //    await _elasticClient.DeleteAsync<Post>
        //(post);

        //    if (_cache.Contains(post))
        //    {
        //        _cache.Remove(post);
        //    }
        //}
        #endregion
    }
}
