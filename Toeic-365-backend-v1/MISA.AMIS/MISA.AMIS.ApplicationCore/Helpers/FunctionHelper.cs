using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
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

        public static string GetMACAddress()
        {
            string firstMacAddress = NetworkInterface
                  .GetAllNetworkInterfaces()
                  .Where(nic => nic.OperationalStatus == OperationalStatus.Up && nic.NetworkInterfaceType != NetworkInterfaceType.Loopback)
                  .Select(nic => nic.GetPhysicalAddress().ToString())
                  .FirstOrDefault();

            return firstMacAddress;
        }

        public static string GetClientIPAddress(HttpContext context)
        {
            string ip = string.Empty;
            if (!string.IsNullOrEmpty(context.Request.Headers["X-Forwarded-For"]))
            {
                ip = context.Request.Headers["X-Forwarded-For"];
            }
            else
            {
                ip = context.Request.HttpContext.Features.Get<IHttpConnectionFeature>().RemoteIpAddress.ToString();
            }
            return ip;
        }
    }
}
