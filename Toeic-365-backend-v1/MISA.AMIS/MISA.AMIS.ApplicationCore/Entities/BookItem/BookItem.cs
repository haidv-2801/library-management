using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel;
using Nest;

namespace TOE.TOEIC.ApplicationCore.Entities
{
    /// <summary>
    /// Thực thể sách mượn
    /// </summary>
    [ElasticsearchType(IdProperty = nameof(BookID)), Description("bookitems")]
    [DisplayName("Book")]
    public class BookItem : Book
    {
        #region Property
        public bool IsReferenceOnly { get; set; }

        [Display(Name = "Giá")]
        public decimal Price { get; set; }

        [Display(Name = "Loại tài liệu")]
        public int BookFormat { get; set; }

        [Display(Name = "Ngày mượn")]
        public DateTime BorrowedDate { get; set; }

        [Display(Name = "Đáo hạn")]
        public DateTime DueDate { get; set; }

        [Display(Name = "Mã sách")]
        public DateTime DateOfPurchase { get; set; }

        [Display(Name = "Thời gian xuất bản")]
        public DateTime PublicationDate { get; set; }
        #endregion
    }
}
