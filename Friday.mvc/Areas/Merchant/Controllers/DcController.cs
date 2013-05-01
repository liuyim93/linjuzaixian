using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Controllers;
using friday.core.services;
using friday.core.repositories;
using friday.core.components;
using Friday.mvc.Areas.Merchant.Models;

namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class DcController : FridayController
    {
        public DcController(IUserService iUserService, ISystemUserRepository iSystemUserRepository)
            : base(iUserService, iSystemUserRepository)
        {
          

        }
        public ActionResult fetchDc()
        {
           
            var dc = new DcModel()
            {
                DcHd = new DcPartial()
                {
                    html=string.Empty
                },
                DcFt = new DcPartial()
                {
                    html = string.Empty
                },
                DcLeft = new DcPartial()
                {
                    html = string.Empty
                },
                DcTopRight = new DcPartial()
                {
                    html = string.Empty
                },
                DcBottomRight = new DcPartial()
                {
                    html = string.Empty
                },
                isSuccess=true,
                renderTime=DateTime.Now,
                releaseTime=DateTime.Now
            };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = dc;
            string json = jsonResult.FormatResult();
            string script = "jsonpDC(" + json + ")";

            return JavaScript(script);
        }

    }
}
