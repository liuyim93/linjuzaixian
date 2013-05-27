﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.repositories;
using Friday.mvc.Models;
using friday.core.EnumType;
using friday.core.domain;
using friday.core.services;
using friday.core;

namespace Friday.mvc.Controllers
{
    public class HomeController : Controller
    {
        IMerchantCategoryRepository iMerchantCategoryRepository;
        IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository;
        IActivityRepository iActivityRepository;
        //IRestaurantRepository iRestaurantRepository;
        IShopRepository iShopRepository;
        //IRentRepository iRentRepository;
        //IFoodRepository iFoodRepository;
        //IHouseRepository iHouseRepository;
        ICommodityRepository iCommodityRepository;
        IUserService iUserService;
        ISchoolService iSchoolService;
        IMerchantService iMerchantService;

        public HomeController(IMerchantCategoryRepository iMerchantCategoryRepository, IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository, IActivityRepository iActivityRepository, IShopRepository iShopRepository, ICommodityRepository iCommodityRepository, IUserService iUserService, ISchoolService iSchoolService, IMerchantService iMerchantService)
        {
            this.iMerchantCategoryRepository = iMerchantCategoryRepository;
            this.iGlobalGoodsTypeRepository = iGlobalGoodsTypeRepository;
            this.iActivityRepository = iActivityRepository;
            //this.iRestaurantRepository = iRestaurantRepository;
            this.iShopRepository = iShopRepository;
            //this.iRentRepository = iRentRepository;
            //this.iFoodRepository = iFoodRepository;
            //this.iHouseRepository = iHouseRepository;
            this.iCommodityRepository = iCommodityRepository;
            this.iUserService = iUserService;
            this.iSchoolService = iSchoolService;
            this.iMerchantService = iMerchantService;
        }
        public ActionResult Index(string selectedSchool)
        {
            MainModel mainModel = new MainModel();

            if (selectedSchool == "" || selectedSchool == null)
            {
                SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
                mainModel.MerchantShopCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.百货);
                mainModel.GlobalGoodsTypeTlevelFirst = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(1);
                mainModel.Activities = this.iActivityRepository.GetAll();

                if (systemUser != null)
                {
                    mainModel.LoginStateFamily[0] = "isLogin";
                    mainModel.LoginStateFamily[1] = systemUser.School.Family + systemUser.School.Id;


                    IList<GlobalGoodsType> globalGoodsTypes = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(0);
                    foreach (GlobalGoodsType g in globalGoodsTypes)
                    {
                        List<Commodity> commodities = iCommodityRepository.GetCommodityByGoodsTypeAndSchoolID(g.Id, systemUser.School.Id);
                        if (commodities != null && commodities.Count != 0)
                        {
                            mainModel.GlobalGoodsTypeTlevelZero.Add(g);
                            mainModel.CommoditiesSearchByGoodsType.Add(commodities);
                            IList<Shop> shops = new List<Shop>();
                            foreach (Commodity c in commodities)
                            {
                                if (shops.Count == 15)
                                {
                                    break;
                                }
                                else
                                {
                                    if (!shops.Contains(c.Shop))
                                    {
                                        shops.Add(c.Shop);
                                    }
                                }
                            }
                            mainModel.Shops.Add(shops);
                        }
                    }
                    mainModel.Commoditys = this.iCommodityRepository.GetCommodityBySchoolID(systemUser.School.Id);

                }
                else
                {
                    string[] areaString = friday.core.components.IPAndLocationHelper.GetAddress();
                    School ipLeafSchool = iSchoolService.FilterSchoolByAreaString(areaString[1]).FirstOrDefault();
                    if (ipLeafSchool != null)
                    {
                        mainModel.LoginStateFamily[0] = "isIP";
                        mainModel.LoginStateFamily[1] = ipLeafSchool.Family + ipLeafSchool.Id;

                        IList<GlobalGoodsType> globalGoodsTypes = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(0);
                        foreach (GlobalGoodsType g in globalGoodsTypes)
                        {
                            List<Commodity> commodities = iCommodityRepository.GetCommodityByGoodsTypeAndSchoolID(g.Id, ipLeafSchool.Id);
                            if (commodities != null && commodities.Count != 0)
                            {
                                mainModel.GlobalGoodsTypeTlevelZero.Add(g);
                                mainModel.CommoditiesSearchByGoodsType.Add(commodities);
                                IList<Shop> shops = new List<Shop>();
                                foreach (Commodity c in commodities)
                                {
                                    if (shops.Count == 15)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        if (!shops.Contains(c.Shop))
                                        {
                                            shops.Add(c.Shop);
                                        }
                                    }
                                }
                                mainModel.Shops.Add(shops);
                            }
                        }
                        mainModel.Commoditys = this.iCommodityRepository.GetCommodityBySchoolID(ipLeafSchool.Id);

                    }
                    else
                    {
                        mainModel.LoginStateFamily[0] = "noAll";

                        IList<GlobalGoodsType> globalGoodsTypes = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(0);
                        foreach (GlobalGoodsType g in globalGoodsTypes)
                        {
                            List<Commodity> commodities = iCommodityRepository.GetCommodityByGoodsType(g.Id);
                            if (commodities != null && commodities.Count != 0)
                            {
                                mainModel.GlobalGoodsTypeTlevelZero.Add(g);
                                mainModel.CommoditiesSearchByGoodsType.Add(this.iCommodityRepository.GetCommodityByGoodsType(g.Id));

                                IList<Shop> shops = new List<Shop>();
                                foreach (Commodity c in commodities)
                                {
                                    if (shops.Count == 15)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        if (!shops.Contains(c.Shop))
                                        {
                                            shops.Add(c.Shop);
                                        }
                                    }
                                }
                                mainModel.Shops.Add(shops);
                            }
                        }
                    }
                }
            }
            else
            {
                mainModel.MerchantShopCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.百货);
                mainModel.GlobalGoodsTypeTlevelFirst = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(1);
                mainModel.Activities = this.iActivityRepository.GetAll();

                School ipLeafSchool = iSchoolService.Load(selectedSchool);
                if (ipLeafSchool != null)
                {
                    mainModel.LoginStateFamily[0] = "isIP";
                    mainModel.LoginStateFamily[1] = ipLeafSchool.Family + ipLeafSchool.Id;

                    IList<GlobalGoodsType> globalGoodsTypes = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(0);
                    foreach (GlobalGoodsType g in globalGoodsTypes)
                    {
                        List<Commodity> commodities = iCommodityRepository.GetCommodityByGoodsTypeAndSchoolID(g.Id, ipLeafSchool.Id);
                        if (commodities != null && commodities.Count != 0)
                        {
                            mainModel.GlobalGoodsTypeTlevelZero.Add(g);
                            mainModel.CommoditiesSearchByGoodsType.Add(commodities);
                            IList<Shop> shops = new List<Shop>();
                            foreach (Commodity c in commodities)
                            {
                                if (shops.Count == 15)
                                {
                                    break;
                                }
                                else
                                {
                                    if (!shops.Contains(c.Shop))
                                    {
                                        shops.Add(c.Shop);
                                    }
                                }
                            }
                            mainModel.Shops.Add(shops);
                        }
                    }
                    mainModel.Commoditys = this.iCommodityRepository.GetCommodityBySchoolID(ipLeafSchool.Id);
                }
            }
            return View(mainModel);
        }

    }
}
