﻿using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOE.TOEIC.ApplicationCore.Entities
{
    public class BookOrderInformationDTO : BookItem
    {
        #region Property
        public string id { get; set; }

        public int quantity { get; set; }
        #endregion
    }
}
