using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace friday.core.components
{

    public class FormatJsonResult
    {
        public string[] ExceptMemberName { get; set; }
        public Object Data { get; set; }

        public string FormatResult()
        {
            HttpResponse response = HttpContext.Current.Response;
            response.ContentType = "application/json";
        
            StringWriter sw = new StringWriter();
            JsonSerializer serializer = JsonSerializer.Create(
                new JsonSerializerSettings
                {
                    //2012-09-30 basilwang new JavaScriptDateTimeConverter() will generate new Date(1234656000000),jquery 1.7 use native json parser will cause error.
                    Converters = new JsonConverter[] { new IsoDateTimeConverter() },
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    NullValueHandling = NullValueHandling.Ignore,
                    ContractResolver = new NHibernateContractResolver(ExceptMemberName)
                }
                );

            using (JsonWriter jsonWriter = new JsonTextWriter(sw))
            {
                jsonWriter.Formatting = Formatting.Indented;
                serializer.Serialize(jsonWriter, Data);
            }
            return sw.ToString();
        }
    }

    public static class FormatJsonExtension
    {
        /// <summary>
        /// 合同付款约定表
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static List<T> DesDataFilter<T>(string json)
        {
            if (string.IsNullOrEmpty(json))
                return null;
            return JsonConvert.DeserializeObject<List<T>>(json);
        }

    }
}
