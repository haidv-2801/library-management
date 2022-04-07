using System;
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
}
