using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using TOE.TOEIC.ApplicationCore.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace TOE.TOEIC.ApplicationCore.Entities
{
    /// <summary>
    /// Thực thể địa chỉ
    /// </summary>

    public class SafeAddress : BaseEntity
    {
        #region Property
        /// <summary>
        /// Id địa chỉ
        /// </summary>
        [Key]
        [IDuplicate]
        [IRequired]
        [Display(Name = "Mã địa chỉ")]
        public Guid SafeAddressID { get; set; } = Guid.NewGuid();
        
        
        [Display(Name = "Giá trị địa chỉ")]
        public string SafeAddressValue { get; set; }

        [Display(Name = "Loại địa chỉ")]
        public SafeAddressType Type { get; set; }

        public string DeviceName { get; set; }

        public string DeviceCode { get; set; }
        #endregion
    }
}
