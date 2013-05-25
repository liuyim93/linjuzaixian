using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;

namespace friday.core.components
{
    public static class IPAndLocationHelper
    {
        private static string GetConnectNetAddress()
        {
            string strUrl = "http://www.ip138.com/ip2city.asp"; //获得IP的网址
            Uri uri = new Uri(strUrl);
            WebRequest webreq = WebRequest.Create(uri);
            Stream s = webreq.GetResponse().GetResponseStream();
            StreamReader sr = new StreamReader(s, Encoding.Default);
            string all = sr.ReadToEnd(); //读取网站返回的数据 格式：您的IP地址是：[x.x.x.x]
            int i = all.IndexOf("[") + 1;
            string tempip = all.Substring(i, 15);
            string ip = tempip.Replace("]", "").Replace(" ", "").Replace("<", "");
            return ip;
        }
        /// <summary>
        /// get the location by ip
        /// </summary>
        /// <returns></returns>
        public static string GetConnectNetAddressArea()
        {
            string strIP = GetConnectNetAddress();
            friday.core.ServiceReference1.IpAddressSearchWebServiceSoap webService = new friday.core.ServiceReference1.IpAddressSearchWebServiceSoapClient();
            string[] strArea = webService.getCountryCityByIp(strIP);
            return strArea[1];
        }
    }
}
