using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using friday.core.domain;
using friday.core;
using Friday.mvc.Models;
using friday.core.repositories;
using friday.core.components;
using Friday.mvc.Areas.Merchant.Models;

namespace Friday.mvc.Areas.OtherPage.Controllers
{
    public class HelpController : Controller
    {
        //
      

        public HelpController( )
        {
         
        }

        public ActionResult Index()
        {
 



            return View();
        }

 
    }
}
