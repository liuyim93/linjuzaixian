﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Areas.Category.Models;
using Friday.mvc.Controllers;
using friday.core.services;
using friday.core.repositories;
using friday.core.domain;
using friday.core.EnumType;
using friday.core;

namespace Friday.mvc.Areas.Category.Controllers
{
    public class HomeController : FridayController
    {
        IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository;
        IShopRepository iShopRepository;
        ISchoolService iSchoolService;
        ICommodityRepository iCommodityRepository;

        public HomeController(IShopRepository iShopRepository, IUserService iUserService, ISystemUserRepository iSystemUserRepository, IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository, ISchoolService iSchoolService, ICommodityRepository iCommodityRepository)
            : base(iUserService, iSystemUserRepository)
        {
            this.iGlobalGoodsTypeRepository = iGlobalGoodsTypeRepository;
            this.iShopRepository = iShopRepository;
            this.iSchoolService = iSchoolService;
            this.iCommodityRepository = iCommodityRepository;
        } 
        public ActionResult all_cat_asyn(string selectedSchool="")//这里是根据什么提取
        {
            CategoryModel categoryModel = new CategoryModel();
            //categoryModel.GlobalGoodsTypeTlevelZero=new List<GlobalGoodsType>();
       /*
            IList<GlobalGoodsType> globalGoodsTypes = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(0);
            foreach (GlobalGoodsType g in globalGoodsTypes)
            {
                List<Commodity> commodities = iCommodityRepository.GetCommodityByGoodsType(g.Id);
                if (commodities != null && commodities.Count != 0)
                {
                    categoryModel.GlobalGoodsTypeTlevelZero.Add(g);
                }
            }*/
            categoryModel.GlobalGoodsTypeTlevelSecond = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevelAndSchool(2, selectedSchool);

            List<string> zeroIds = new List<string>();

            foreach (GlobalGoodsType g in categoryModel.GlobalGoodsTypeTlevelSecond)
            {
                zeroIds.Add(g.Family.Split(',')[0]);
            }

            List<string> seconds = new List<string>();

            foreach (GlobalGoodsType g in categoryModel.GlobalGoodsTypeTlevelSecond)
            {
                seconds.Add(g.Family.Split(',')[1]);
            }


            categoryModel.GlobalGoodsTypeTlevelZero = this.iGlobalGoodsTypeRepository.GetGoodsTypeByIdAndLevel(zeroIds,0);
            categoryModel.GlobalGoodsTypeTlevelFirst = this.iGlobalGoodsTypeRepository.GetGoodsTypeByIdAndLevel(seconds, 1);

            ViewData["selectSchool"] = selectedSchool;
            return View(categoryModel);
        }
        public ActionResult brand_cat_asyn(string selectIP)
        {
            CategoryModel categoryModel = new CategoryModel();
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);

            if (selectIP != null && selectIP != "" && selectIP != "null")
            {
                IList<Shop> shopModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.百货, selectIP);
                IList<Shop> shopFoodModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.餐馆, selectIP);
                categoryModel.shopModes = shopModesList;

                //IList<Commodity> cs = iCommodityRepository.GetCommodityByGoodsTypeAndSchoolID("46f9bf2d-0a21-4997-87fe-b21ac9abf8e7", selectIP);
                //IList<Shop> foodOrderModesList = new List<Shop>();
                //foreach (Commodity c in cs)
                //{
                //    if (!foodOrderModesList.Contains(c.Shop))
                //        foodOrderModesList.Add(c.Shop);
                //}
                categoryModel.orderFoodModes = shopFoodModesList;
            }
            else
            {
                if (systemUser != null)
                {
                    IList<Shop> shopModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.百货, systemUser.School.Id);
                    IList<Shop> shopFoodModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.餐馆, systemUser.School.Id);
                    categoryModel.shopModes = shopModesList;

                    //IList<Commodity> cs = iCommodityRepository.GetCommodityByGoodsTypeAndSchoolID("46f9bf2d-0a21-4997-87fe-b21ac9abf8e7", systemUser.School.Id);
                    //IList<Shop> foodOrderModesList = new List<Shop>();
                    //foreach (Commodity c in cs)
                    //{
                    //    if (!foodOrderModesList.Contains(c.Shop))
                    //        foodOrderModesList.Add(c.Shop);
                    //}
                    categoryModel.orderFoodModes = shopFoodModesList;
                }
                else
                {
                    string[] areaString = friday.core.components.IPAndLocationHelper.GetAddress();
                    School ipLeafSchool = iSchoolService.FilterSchoolByAreaString(areaString[1]).FirstOrDefault();
                    if (ipLeafSchool != null)
                    {
                        IList<Shop> shopModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.百货, ipLeafSchool.Id);
                        IList<Shop> shopFoodModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.餐馆, ipLeafSchool.Id);
                        categoryModel.shopModes = shopModesList;

                        //IList<Commodity> cs = iCommodityRepository.GetCommodityByGoodsTypeAndSchoolID("46f9bf2d-0a21-4997-87fe-b21ac9abf8e7", ipLeafSchool.Id);
                        //IList<Shop> foodOrderModesList = new List<Shop>();
                        //foreach (Commodity c in cs)
                        //{
                        //    if (!foodOrderModesList.Contains(c.Shop))
                        //        foodOrderModesList.Add(c.Shop);
                        //}
                        categoryModel.orderFoodModes = shopFoodModesList;
                    }
                    else
                    {
                        IList<Shop> shopModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.百货);
                        IList<Shop> shopFoodModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.餐馆);
                        categoryModel.shopModes = shopModesList;

                        //IList<Commodity> cs = iCommodityRepository.GetCommodityByGoodsType("46f9bf2d-0a21-4997-87fe-b21ac9abf8e7");
                        //IList<Shop> foodOrderModesList = new List<Shop>();
                        //foreach (Commodity c in cs)
                        //{
                        //    if (!foodOrderModesList.Contains(c.Shop))
                        //        foodOrderModesList.Add(c.Shop);
                        //}
                        categoryModel.orderFoodModes = shopFoodModesList;
                    }
                }
            }
            return View(categoryModel);
        }
        public ActionResult cat_nav_asyn(string callback)
        {
            string content="\"<div class=\\\"sn-mcate-ctn-con\\\" id=\\\"J_MallCateCtnCon\\\"><a class=\\\"sn-mcate-logo-link\\\" id=\\\"J_MallCateLogoLink\\\" href=\\\"http://www.tmall.com/\\\" target=\\\"_self\\\">邻居Tmall.com</a><ul class=\\\"sn-mcate-ctn\\\" id=\\\"J_MallCateCtn\\\"><li><h4 class=\\\"sn-mcate-item-hd\\\"><span>服饰内衣</span></h4><p class=\\\"sn-mcate-item-bd\\\"><a href=\\\"\\\" target=\\\"_blank\\\">女装</a><a href=\\\"\\\" target=\\\"_blank\\\">男装</a><a href=\\\"\\\" target=\\\"_blank\\\">内衣</a><a href=\\\"\\\" target=\\\"_blank\\\">家居服</a><a href=\\\"\\\" target=\\\"_blank\\\">配件</a><a href=\\\"\\\" target=\\\"_blank\\\">羽绒</a><a href=\\\"\\\" target=\\\"_blank\\\">呢大衣</a><a href=\\\"\\\" target=\\\"_blank\\\">毛衣</a></p></li></ul></div>\"";
            string script = "window._mallCateCtnHandler("+content+")";
            return JavaScript(script);
        }

    }
}
