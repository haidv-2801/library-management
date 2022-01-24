using MISA.AMIS.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MISA.AMIS.ApplicationCoore.Entities
{
    /// <summary>
    /// Thực thể người dùng
    /// </summary>
    public class User : BaseEntity
    {
        #region Property
        /// <summary>
        /// Id nhân viên
        /// </summary>
        [Key]
        public Guid UserID { get; set; } = Guid.NewGuid();

        /// <summary>
        /// Họ và tên nhân viên
        /// </summary>
        [Display(Name ="Tên người dùng")]
        public string UserName { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Display(Name = "Email")]
        [IDuplicate]
        [IEmailFormat]
        public string Email { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }
        #endregion
    }
}
