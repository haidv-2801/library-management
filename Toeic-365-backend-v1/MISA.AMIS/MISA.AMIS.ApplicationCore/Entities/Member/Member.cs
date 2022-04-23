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
    /// Thực thể bạn đọc
    /// </summary>
    public class Member : BaseEntity
    {

        #region Property
        /// <summary>
        /// Id bạn đọc
        /// </summary>
        [Key]
        public Guid MemberID { get; set; } = Guid.NewGuid();

        public Guid CategoryID { get; set; } = Guid.Empty;

        public string Author { get; set; }

        public string Description { get; set; }

        public DateTime DueDate { get; set; }

        public DateTime BorrowedDate { get; set; }

        public decimal Price { get; set; }
        #endregion
    }
}
