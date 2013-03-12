using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.components;

namespace Friday.mvc.Areas.Message.Controllers
{
    public class NotifyController : Controller
    {
        //
        // GET: /Message/Notify/

        public ActionResult Index()
        {
            var list = CreateListFromSingle(
            new { uid = "basil", msg_num = 100 }
            );
            list.Add(new { uid = "tom", msg_num = 200 });
           return new JsonNetResult() { Data = list };
        }
        private List<T> CreateListFromSingle<T>(T value)
        {
            var list = new List<T>();
            list.Add(value);
            return list;
        }

    }
}
