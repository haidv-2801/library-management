﻿using System;
using System.Collections.Generic;
using System.Text;

namespace TOE.TOEIC.ApplicationCore.Enums
{
    public static class DataType
    {
        public static readonly string DATE_TIME = "DateTime"; 
        public static readonly string INTEGER = "Int32"; 
        public static readonly string GUID = "Guid"; 
    }

    public static class MenuType
    {
        public static readonly int HTML_RENDER = 0;
        public static readonly int REDIRECT = 1;
        public static readonly int NORMAL = 2;
        public static readonly int NONE_EVENT = 3;
    }

    public static class Operator
    {
        public static readonly string EQUAL = "=";
        public static readonly string NOT_EQUAL = "<>";
        public static readonly string AND = "AND";
        public static readonly string OR = "OR";
        public static readonly string NOT = "NOT";
        public static readonly string CONTAINS = "CONTAINS";
        public static readonly string START_WIDTH = "START_WIDTH";
        public static readonly string END_WIDTH = "END_WIDTH";
    }

    public static class SortType
    {
        public static readonly string DESC = "DESC";
        public static readonly string ASC = "ASC";
    }
}
