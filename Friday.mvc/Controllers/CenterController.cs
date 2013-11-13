using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Models;
using Friday.mvc.Controllers;
using friday.core;
using friday.core.services;
using friday.core.domain;
using friday.core.repositories;
using System.Web.Security;
namespace Friday.mvc.Controllers
{
    public class CenterController : FridayController
    {
        
       private ICartOfCommodityService iCartOfCommodityService;
        private IShoppingCartService iShoppingCartService;
        public CenterController(IUserService iUserService, ISystemUserRepository iSystemUserRepository, ICartOfCommodityService iCartOfCommodityService, IShoppingCartService iShoppingCartService)
            : base(iUserService, iSystemUserRepository)
        {
            this.iCartOfCommodityService = iCartOfCommodityService;
            this.iShoppingCartService = iShoppingCartService;
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}
