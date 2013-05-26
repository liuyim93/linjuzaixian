using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using friday.core.ServiceReference1;
using System.ServiceModel;

namespace friday.core.components
{
    public static class IPAndLocationHelper
    {

        /// <summary>
        /// 通过输入IP地址查询国家、城市、所有者等信息。没有注明国家的为中国
        /// </summary>
        /// <param name="strIp">IP地址</param>
        /// <returns>一个一维字符串数组String(1)，String(0) = IP地址；String(1) = 查询结果或提示信息</returns>
        public static string[] GetAddress(string strIp)
        {
            friday.core.ServiceReference1.IpAddressSearchWebServiceSoapClient ip = new friday.core.ServiceReference1.IpAddressSearchWebServiceSoapClient(new BasicHttpBinding(), new EndpointAddress("http://www.webxml.com.cn/WebServices/IpAddressSearchWebService.asmx"));
            return ip.getCountryCityByIp(strIp);
        }

        /// <summary>
        /// 获得您的IP地址和地址信息
        /// </summary>
        /// <returns>一个一维字符串数组String(1)，String(0) = IP地址；String(1) = 地址信息</returns>
        public static string[] GetLocalIp()
        {
            friday.core.ServiceReference1.IpAddressSearchWebServiceSoapClient ip = new friday.core.ServiceReference1.IpAddressSearchWebServiceSoapClient(new BasicHttpBinding(), new EndpointAddress("http://www.webxml.com.cn/WebServices/IpAddressSearchWebService.asmx"));
            return ip.getGeoIPContext();
        }
    }
}
