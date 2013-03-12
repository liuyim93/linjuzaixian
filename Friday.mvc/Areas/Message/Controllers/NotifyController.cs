using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.components;
using friday.core.repositories;

namespace Friday.mvc.Areas.Message.Controllers
{
    public class NotifyController : Controller
    {
        IMessageRepository iMessageRepository;
        public NotifyController(IMessageRepository iMessageRepository)
        {
            this.iMessageRepository = iMessageRepository;
        }

        public ActionResult Index()
        {
            //var list = CreateListFromSingle(
            //new { uid = "basil", msg_num = 100 }
            //);
            //list.Add(new { uid = "tom", msg_num = 200 });
           IList<object> list= iMessageRepository.GetSystemUserNewMessageNum();
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
