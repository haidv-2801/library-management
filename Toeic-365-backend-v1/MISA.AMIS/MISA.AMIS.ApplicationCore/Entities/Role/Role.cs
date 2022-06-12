using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using TOE.TOEIC.ApplicationCore.Enums;

namespace TOE.TOEIC.ApplicationCore.Entities
{
    [Table("Role")]
    public class Role : BaseEntity
    {
        #region Property
        [Key]
        public Guid RoleID { get; set; } = Guid.NewGuid();

        public string RoleName { get; set; }
 
        public Roles RoleType { get; set; }

        public string Description { get; set; }
        #endregion
    }
}
