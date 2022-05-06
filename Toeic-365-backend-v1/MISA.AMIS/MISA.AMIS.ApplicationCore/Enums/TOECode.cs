﻿using System;
using System.Collections.Generic;
using System.Text;

namespace TOE.TOEIC.Entities
{
    public enum TOECode
    {
        /// <summary>
        /// Hợp lệ
        /// </summary>
        Valid = 100,

        /// <summary>
        /// Không hợp lệ
        /// </summary>
        InValid = 200,

        /// <summary>
        /// Thành công  
        /// </summary>
        Success = 900,

        /// <summary>
        /// Thất bại  
        /// </summary>
        Fail = 700,

        /// <summary>
        /// Lỗi exception
        /// </summary>
        Exception = 500
    }

    public enum EntityState
    {
        Add = 1,
        Update = 2,
        Delete = 3
    }
}
