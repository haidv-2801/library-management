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
    public class Book : BaseEntity
    {

        #region Property
        /// <summary>
        /// Id bạn đọc
        /// </summary>
        [Key]
        public Guid BookID { get; set; } = Guid.NewGuid();

        public Guid CategoryID { get; set; } = Guid.Empty;

        public string BookCode { get; set; }
        
        public string BookName { get; set; }

        public string Description { get; set; }

        public string Publiser { get; set; }

        public string Author { get; set; }

        public string LanguageCode { get; set; }

        public string Image { get; set; }
        #endregion
    }
}
