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
    /// Thực thể book order
    /// </summary>
    [DisplayName("BookOrder")]
    public class BookOrder : BaseEntity
    {
        #region Property
        /// <summary>
        /// Id book order
        /// </summary>
        [Key]
        public Guid BookOrderID { get; set; } = Guid.NewGuid();

        public Guid AccountID { get; set; } = Guid.Empty;

        public string BookOrderInformation { get; set; }

        public string Note { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime DueDate { get; set; }
        #endregion
    }
}
