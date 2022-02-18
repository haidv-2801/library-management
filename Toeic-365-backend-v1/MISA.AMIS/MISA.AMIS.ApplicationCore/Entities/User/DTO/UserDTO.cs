using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOE.TOEIC.ApplicationCoore.Entities
{
    public class UserDTO : BaseEntity
    {
        #region Property
        /// <summary>
        /// Họ và tên nhân viên
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }
        #endregion
    }
}
