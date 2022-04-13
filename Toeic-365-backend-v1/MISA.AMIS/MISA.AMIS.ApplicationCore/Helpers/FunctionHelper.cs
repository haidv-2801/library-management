using System;
using System.Collections.Generic;
using System.Text;

namespace TOE.TOEIC.ApplicationCore.Helpers
{
    public static class FunctionHelper
    {
        public static string Base64Decode(string base64EncodedData)
        {
            if (string.IsNullOrEmpty(base64EncodedData)) return string.Empty;
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static string Base64Encode(string plainText)
        {
            if (string.IsNullOrEmpty(plainText)) return string.Empty;
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    }
}
