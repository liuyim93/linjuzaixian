using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Friday.mvc.Areas.Category.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Category/Home/

        public ActionResult all_cat_asyn()
        {
            return View();
        }
        public ActionResult cat_nav_asyn(string callback)
        {
            string content="\"< div class=\\\"sn-mcate-ctn-con\\\" id=\\\"J_MallCateCtnCon\\\"><a class=\\\"sn-mcate-logo-link\\\" id=\\\"J_MallCateLogoLink\\\" href=\\\"http://www.tmall.com/\\\" target=\\\"_self\\\">天猫Tmall.com</a><ul class=\\\"sn-mcate-ctn\\\" id=\\\"J_MallCateCtn\\\"><li><h4 class=\\\"sn-mcate-item-hd\\\"><span>服饰内衣</span></h4><p class=\\\"sn-mcate-item-bd\\\"><a href=\\\"\\\" target=\\\"_blank\\\">女装</a><a href=\\\"\\\" target=\\\"_blank\\\">男装</a><a href=\\\"\\\" target=\\\"_blank\\\">内衣</a><a href=\\\"\\\" target=\\\"_blank\\\">家居服</a><a href=\\\"\\\" target=\\\"_blank\\\">配件</a><a href=\\\"\\\" target=\\\"_blank\\\">羽绒</a><a href=\\\"\\\" target=\\\"_blank\\\">呢大衣</a><a href=\\\"\\\" target=\\\"_blank\\\">毛衣</a></p></li></ul></div>\"";
            string script = "window._mallCateCtnHandler("+content+")";
            return JavaScript(script);
        }

    }
}
