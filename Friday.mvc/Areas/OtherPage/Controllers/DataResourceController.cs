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
    public class DataResourceController : Controller
    {
        //

        private IDataResourceService iDataResourceService;

        public DataResourceController(IDataResourceService iDataResourceService)
        {
            this.iDataResourceService = iDataResourceService;
           
        }


        public ActionResult Index(string secitonName)
        {
            DataResourceModel drm = new DataResourceModel();
            drm.DataResource = iDataResourceService.SearchBySectionName(secitonName);

            return View(drm);
        }

 
    }
}
