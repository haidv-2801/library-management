using TOE.TOEIC.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace TOE.TOEIC.ApplicationCore.Entities
{
    public class DbResponse
    {
        public object Data { get; set; }

        public int TotalPages { get; set; }

        public int TotalRecords { get; set; }
    }
}
