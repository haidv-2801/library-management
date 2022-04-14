using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOE.TOEIC.ApplicationCoore.Entities
{
  public class AccountLoginDTO 
  {
    #region Property
    /// <summary>
    /// Email
    /// </summary>
    [Display(Name = "Email")]
    public string Email { get; set; }

    [Display(Name = "Mật khẩu")]
    public string Password { get; set; }
    #endregion
  }
}
