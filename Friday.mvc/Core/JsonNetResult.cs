using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Text;
using Newtonsoft.Json.Converters;
using System.IO;
using friday.core.components;

namespace Friday.mvc
{
    /// <summary>
    /// A Newtonsoft.Json based JsonResult for ASP.NET MVC
    /// </summary>
    public class JsonNetResult : ActionResult
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="JsonNetResult"/> class.
        /// </summary>
        public JsonNetResult()
        {
        }
        public string[] ExceptMemberName { get; set; }
        public Object Data { get; set; }

        /// <summary>
        /// Enables processing of the result of an action method by a custom type that inherits from the <see cref="T:System.Web.Mvc.ActionResult"/> class.
        /// </summary>
        /// <param name="context">The context in which the result is executed. The context information includes the controller, HTTP content, request context, and route data.</param>
        public override void ExecuteResult(ControllerContext context)
        {
            HttpResponse response = HttpContext.Current.Response;
            response.ContentType = "application/json";

            //StringWriter sw = new StringWriter();
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

            using (JsonWriter jsonWriter = new JsonTextWriter(response.Output))
            {
                jsonWriter.Formatting = Formatting.Indented;
                serializer.Serialize(jsonWriter, Data);
                jsonWriter.Flush();
            }
        }
    }
}