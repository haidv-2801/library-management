﻿using TOE.TOEIC.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace TOE.TOEIC.ApplicationCore.Entities
{
    public class ServiceResult
    {
        //Lưu dữ liệu được trả về, bao gồm cả câu thông báo
        public object Data { get; set; }

        //Lưu câu thông báo
        public string Messasge { get; set; }

        //Lưu mã lỗi
        public TOECode TOECode { get; set; }
    }
}
