﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using friday.core.domain;
using Friday.mvc.Models;
using friday.core;

namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class FavoriteController : Controller
    {
        private IMerchantService iMerchantService;
        private IUserService iUserService;
        private IMyFavoriteService iMyFavoriteService;
        //private IFoodService iFoodService;
        //private IHouseService iHouseService;
        private ICommodityService iCommodityService;
        private ISchoolService iSchoolService;
        private ISkuService iSkuService;

        public FavoriteController(IMerchantService iMerchantService, IUserService iUserService, IMyFavoriteService iMyFavoriteService, ICommodityService iCommodityService, ISchoolService iSchoolService, ISkuService iSkuService)
        {
            this.iMerchantService = iMerchantService;
            this.iUserService = iUserService;
            this.iMyFavoriteService = iMyFavoriteService;
            //this.iFoodService = iFoodService;
            //this.iHouseService = iHouseService;
            this.iCommodityService = iCommodityService;
            this.iSchoolService = iSchoolService;
            this.iSkuService = iSkuService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddToFav(string brandId, string _tb_token_, string callback)
        {
            MyFavorite myFavorite = new MyFavorite();
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            friday.core.Merchant merchant = iMerchantService.Load(brandId);
            myFavorite.SystemUser = systemUser;
            myFavorite.Merchant = merchant;
            iMyFavoriteService.Save(myFavorite);

            string isSucceed = "T";
            string script = callback + "({\"is_success\":\"" + isSucceed + "\"})";

            return JavaScript(script);
        }
        public ActionResult DelFromFav(string brandId, string _ksTS, string callback)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            MyFavorite myFavorite = iMyFavoriteService.GetMyFavoriteBySystemUserAndMerchant(systemUser, brandId);
            iMyFavoriteService.Delete(myFavorite.Id);

            string isSucceed = "T";
            string script = callback + "({\"is_success\":\"" + isSucceed + "\"})";

            return JavaScript(script);
        }

        public ActionResult Recommend(string callback, string selectIP)
        {
            string json;
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);

            if (selectIP != null && selectIP != "" && selectIP != "null")
            {
                json = this.iMerchantService.GetMerchantsJson(iUserService.GetOrCreateUser(this.HttpContext), selectIP);
            }
            else
            {
                if (systemUser != null)
                {
                    json = this.iMerchantService.GetMerchantsJson(null, systemUser.School.Id);
                }
                else
                {

                    json = this.iMerchantService.GetMerchantsJson(null, "");

                }
            }

            string script = callback + "(" + json + ")";

            return JavaScript(script);
        }
        public ActionResult myBrandsIndex(string page)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            if (systemUser == null)
            {
                return Redirect("http://www.linjuzaixian.com/member/login.jhtml?redirect_url=http://www.linjuzaixian.com/myBrandsIndex.html");
            }

            int currentPage = (page == "" || page == null) ? 1 : Convert.ToInt16(page);
            int numPerPageValue = 10;
            int total;

            int start = (currentPage - 1) * numPerPageValue;
            int limit = numPerPageValue;

            MyBrandsIndexModel myBrandsIndexModel = new MyBrandsIndexModel();
            //如果用户已经登录则准备收藏数据
            myBrandsIndexModel.userName = systemUser.LoginUser.LoginName;
            if (this.HttpContext.User.Identity.IsAuthenticated == true)
            {
                //int start, int limit, out long total
                IList<MyFavorite> myFavorites = this.iMyFavoriteService.GetMyFavoriteBySystemUser(systemUser, start, limit, out total);
                myBrandsIndexModel.currenPage = currentPage;
                myBrandsIndexModel.pageNum = total / numPerPageValue + 1;

                int merchantIndex = 0;
                int foodIndex = 0;
                int commodityIndex = 0;
                int houseIndex = 0;

                foreach (MyFavorite m in myFavorites)
                {
                    myBrandsIndexModel.FavMerchants.Add(m.Merchant);
                    //if (m.Merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.餐馆)
                    //{
                    //    IList<Food> foods = iFoodService.GetFoodByRestaurantIDOrderByMonthAmountDesc(m.Merchant.Id);
                    //    if (foods.Count > 0)
                    //    {
                    //        foreach (Food f in foods)
                    //        {
                    //            myBrandsIndexModel.Foods[foodIndex].Add(f);
                    //        }
                    //        foodIndex++;
                    //    }
                    //}
                    //else
                    if (m.Merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
                    {
                        IList<Commodity> commoditys = iCommodityService.GetCommodityByShopIDOrderByMonthAmountDesc(m.Merchant.Id);
                        if (commoditys.Count > 0)
                        {
                            foreach (Commodity c in commoditys)
                            {
                                myBrandsIndexModel.Commoditys[commodityIndex].Add(c);
                                Sku minpricesku = iSkuService.GetMinPriceSkusByCommodityID(c.Id);
                                myBrandsIndexModel.minPriceSkuList[commodityIndex].Add(minpricesku);
                            }
                            commodityIndex++;
                        }
                    }
                    //else if (m.Merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.租房)
                    //{
                    //    IList<House> houses = iHouseService.GetHouseByRentIDOrderByMonthAmountDesc(m.Merchant.Id);
                    //    if (houses.Count > 0)
                    //    {
                    //        foreach (House h in houses)
                    //        {
                    //            myBrandsIndexModel.Houses[houseIndex].Add(h);
                    //        }
                    //        houseIndex++;
                    //    }
                    //}
                    merchantIndex++;
                }
            }

            return View(myBrandsIndexModel);
        }
    }
}
