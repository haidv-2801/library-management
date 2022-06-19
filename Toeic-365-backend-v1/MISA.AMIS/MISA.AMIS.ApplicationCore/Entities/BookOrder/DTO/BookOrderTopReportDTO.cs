﻿using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOE.TOEIC.ApplicationCore.Entities
{
    public class BookOrderTopReportDTO
    {
        #region Property
        public string BookName { get; set; }

        public string BookCode { get; set; }

        public int Quantity { get; set; }
        #endregion
    }
}
