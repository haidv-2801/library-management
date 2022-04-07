using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TOE.TOEIC.ApplicationCoore.Entities
{
    /// <summary>
    /// Thực thể bài viết
    /// </summary>
    public class Post : BaseEntity
    {
        #region Property
        /// <summary>
        /// Id bài viết
        /// </summary>
        [Key]
        public Guid PostID { get; set; } = Guid.NewGuid();

        /// <summary>
        /// Id bài viết
        /// </summary>
        public Guid MenuID { get; set; } = Guid.Empty;

        /// <summary>
        /// Mã bài viết
        /// </summary>
        [IDuplicate]
        [IRequired]
        [Display(Name = "Tiêu đề bài viết")]
        public string Title { get; set; }

        /// <summary>
        /// Họ và tên bài viết
        /// </summary>
        [Display(Name = "Alias bài viết")]
        [IDuplicate]
        public string Slug { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        [Display(Name = "Mô tả của bài viết")]
        public string Description { get; set; }

        /// <summary>
        /// Nội dung html
        /// </summary>
        [Display(Name = "Nội dung html")]
        public string Content { get; set; }

        /// <summary>
        /// Ảnh xem trước
        /// </summary>
        [Display(Name = "Ảnh xem trước")]
        public string Image { get; set; }

        /// <summary>
        /// Lượt xem
        /// </summary>
        [Display(Name = "Lượt xem")]
        public int ViewCount { get; set; }

        /// <summary>
        /// Loại bài viết
        /// </summary>
        [Display(Name = "Loại bài viết")]
        public int Type { get; set; }
        #endregion
    }
}
