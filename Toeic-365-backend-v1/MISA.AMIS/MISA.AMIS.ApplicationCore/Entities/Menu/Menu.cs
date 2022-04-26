﻿using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TOE.TOEIC.ApplicationCore.Entities
{
    /// <summary>
    /// Thực thể menu
    /// </summary>
    public class Menu : BaseEntity
    {
        #region Property
        /// <summary>
        /// Id menu
        /// </summary>
        [Key]
        public Guid MenuID { get; set; } = Guid.NewGuid();

        /// <summary>
        /// Mã menu
        /// </summary>
        [IDuplicate]
        [IRequired]
        [Display(Name = "Tiêu đề menu")]
        public string Title { get; set; }

        /// <summary>
        /// Họ và tên menu
        /// </summary>
        [Display(Name = "Alias menu")]
        public string Slug { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        [Display(Name = "ID cha của menu")]
        public Guid? ParentID { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        [Display(Name = "Hiển thị trang chủ")]
        public bool IsShowHome { get; set; }

        /// <summary>
        /// Nội dung html
        /// </summary>
        [Display(Name = "Đường dẫn menu")]
        public string Link { get; set; }

        /// <summary>
        /// Lượt xem
        /// </summary>
        [Display(Name = "Chỉ số hiển thị")]
        public int DisplayOrder { get; set; }

        /// <summary>
        /// Loại menu
        /// </summary>
        [Display(Name = "Loại menu")]
        public int Type { get; set; }

        #endregion
    }
}
