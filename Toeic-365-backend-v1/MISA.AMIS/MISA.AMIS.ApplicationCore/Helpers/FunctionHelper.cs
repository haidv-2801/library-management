﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
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

        public static string GetIPV4Address()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            return string.Empty;
        }

        public static string NextRecordCode(string code)
        {

            //1. Tìm vị trí của chữ số đầu tiên
            int firstDigitIndex = code.IndexOfAny(new char[]
                { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' });

            //2. Lấy ra tiền tố của mã nhân viên
            string prefix = code.Substring(0, firstDigitIndex);

            //3. Lấy hậu tố là số
            string postFix = code.Substring(firstDigitIndex);
            string postFixNum = (int.Parse(postFix) + 1).ToString();
            if(postFixNum.Length < postFix.Length)
            {
                postFixNum = postFixNum.PadLeft(6, '0');
            }

            //4. Nối
            return string.Concat(prefix, postFixNum);
        }
    }
}
