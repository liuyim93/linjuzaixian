using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using friday.core.domain;
using friday.core.services;
using friday.core.components;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using Friday.mvc.Models;

namespace Friday.mvc.Areas.Order.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Order/Home/

        public ActionResult ConfirmOrder()
        {
            OrderModel orderModel = new OrderModel();
            return View(orderModel);
        }

    }
}
