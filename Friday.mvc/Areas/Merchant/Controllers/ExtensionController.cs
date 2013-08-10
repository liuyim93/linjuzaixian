using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Controllers;
using friday.core.components;
using Friday.mvc.Areas.Merchant.Models;
using friday.core.services;
using friday.core.repositories;

namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class ExtensionController : FridayController
    {
        IMerchantService iMerchantService;

        public ExtensionController(IUserService iUserService, ISystemUserRepository iSystemUserRepository, IMerchantService iMerchantService)
            : base(iUserService, iSystemUserRepository)
        {
            this.iMerchantService = iMerchantService;

        }
        public ActionResult initExtension(string sellerId)
        {
            friday.core.Merchant merchant = iMerchantService.Load(sellerId);
            var breadCrumb=new List<string[]>();
            breadCrumb.Add(new string[] { "邻居网", "http://www.linjuzaixian.com/index.html" });
            breadCrumb.Add(new string[] { merchant.Name, "http://www.linjuzaixian.com/Merchant/index?scid=" + merchant.Id });
            var providerList = new List<Spu>();
            providerList.Add(new Spu() { shopUrl = "http://www.linju.com", shopName = "小熊在线" });
            providerList.Add(new Spu() { shopUrl = "http://www.linju.com", shopName = "小马在线" });
            providerList.Add(new Spu() { shopUrl = "http://www.linju.com", shopName = "小狗在线" });
            
            var extensionModel = new ExtensionModel()
            {
                breadCrumbDO = new BreadCrumbDO()
                {
                    breadCrumb = breadCrumb
                }, 
                spuMaintainerDO=new SpuMaintainerDO{
                    providerList=providerList
                },
                success =true
                
            };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = extensionModel;
            string json = jsonResult.FormatResult();
            string script = "jsonpInitExtension(" + json + ")";

            return JavaScript(script);
        }

    }
}
