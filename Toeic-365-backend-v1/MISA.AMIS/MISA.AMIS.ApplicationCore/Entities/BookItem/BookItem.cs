using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel;
using Nest;

namespace TOE.TOEIC.ApplicationCoore.Entities
{
    /// <summary>
    /// Thực thể sách mượn
    /// </summary>
    public class BookItem : Book
    {
        #region Property
        public bool IsReferenceOnly { get; set; }

        public decimal Price { get; set; }

        public int BookFormat { get; set; }

        public DateTime BorrowedDate { get; set; }

        public DateTime DueDate { get; set; }

        public DateTime DateOfPurchase { get; set; }

        public DateTime PublicationDate { get; set; }
        #endregion
    }
}
