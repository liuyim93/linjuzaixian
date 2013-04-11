﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Models;
using friday.core.services;
using friday.core.domain;
using friday.core;
using Friday.mvc.Areas.Merchant.Models;
using friday.core.components;

namespace Friday.mvc.Areas.Merchant.Controllers
{

    public class DetailController : Controller
    {
        private IMerchantService iMerchantService;
        private IUserService iUserService;

        private IFoodService iFoodService;
        private IHouseService iHouseService;
        private ICommodityService iCommodityService;

        private IOrderOfCommodityService iOrderOfCommodityService;
        private IOrderOfFoodService iOrderOfFoodService;
        private IOrderOfHouseService iOrderOfHouseService;

        private IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService;
        private IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService;
        private IValuingOfMyHouseOrderService iValuingOfMyHouseOrderService;

        public DetailController(IMerchantService iMerchantService, IUserService iUserService, IFoodService iFoodService, IHouseService iHouseService, ICommodityService iCommodityService, IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService, IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService, IValuingOfMyHouseOrderService iValuingOfMyHouseOrderService, IOrderOfCommodityService iOrderOfCommodityService, IOrderOfFoodService iOrderOfFoodService, IOrderOfHouseService iOrderOfHouseService)
        {
            this.iMerchantService = iMerchantService;
            this.iUserService = iUserService;

            this.iFoodService = iFoodService;
            this.iHouseService = iHouseService;
            this.iCommodityService = iCommodityService;

            this.iValuingOfMyCommodityOrderService = iValuingOfMyCommodityOrderService;
            this.iValuingOfMyFoodOrderService = iValuingOfMyFoodOrderService;
            this.iValuingOfMyHouseOrderService = iValuingOfMyHouseOrderService;

            this.iOrderOfCommodityService = iOrderOfCommodityService;
            this.iOrderOfFoodService = iOrderOfFoodService;
            this.iOrderOfHouseService = iOrderOfHouseService;
        }

        public ActionResult Index()
        {
            string brandId = Request.Params["brandId"].ToString();
            friday.core.Merchant merchant = iMerchantService.Load(brandId);

            DetailModel detailModel = new DetailModel();
            detailModel.Merchant = merchant;
            int index = 0;

            if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.餐馆)
            {
                IList<Food> foods = iFoodService.GetFoodByRestaurantIDOrderByMonthAmountDesc(merchant.Id);
                if (foods.Count > 0)
                {
                    foreach (Food f in foods)
                    {
                        detailModel.Foods.Add(f);

                        IList<ValuingOfMyFoodOrder> valuingOfMyFoodOrders = iValuingOfMyFoodOrderService.GetValuingOfMyFoodOrderByFoodID(f.Id);
                        foreach (ValuingOfMyFoodOrder v in valuingOfMyFoodOrders)
                        {
                            detailModel.ValuingOfMyFoodOrders[index].Add(v);
                        }
                        index++;
                    }
                }
            }
            else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
            {
                IList<Commodity> commoditys = iCommodityService.GetCommodityByShopIDOrderByMonthAmountDesc(merchant.Id);
                if (commoditys.Count > 0)
                {
                    foreach (Commodity c in commoditys)
                    {
                        detailModel.Commoditys.Add(c);

                        IList<ValuingOfMyCommodityOrder> valuingOfMyCommodityOrders = iValuingOfMyCommodityOrderService.GetValuingOfMyCommodityOrderByCommodityID(c.Id);
                        foreach (ValuingOfMyCommodityOrder v in valuingOfMyCommodityOrders)
                        {
                            detailModel.ValuingOfMyCommodityOrders[index].Add(v);
                        }
                        index++;
                    }
                }
            }
            else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.租房)
            {
                IList<House> houses = iHouseService.GetHouseByRentIDOrderByMonthAmountDesc(merchant.Id);
                if (houses.Count > 0)
                {
                    foreach (House h in houses)
                    {
                        detailModel.Houses.Add(h);

                        IList<ValuingOfMyHouseOrder> valuingOfMyHouseOrders = iValuingOfMyHouseOrderService.GetValuingOfMyHouseOrderByHouseID(h.Id);
                        foreach (ValuingOfMyHouseOrder v in valuingOfMyHouseOrders)
                        {
                            detailModel.ValuingOfMyHouseOrders[index].Add(v);
                        }
                        index++;
                    }
                }
            }

            return View(detailModel);
        }
        public ActionResult InitItemDetail()
        {
            DefaultModel defaultModel = new DefaultModel()
            {
                deliveryDO = new DeliveryDO()
                {
                    deliverySkuMap = new
                    {
                        a23105929387=new List<SKU>(){new SKU()
                        {
                            money="0",
                            name="",
                            postage="快递: 0.00 ",
                            postageFree=false,
                            signText="",
                            type=0
                        }},
                        a23105929386 = new List<SKU>(){new SKU()
                        {
                            money = "190.00",
                            name = "",
                            postage = "快递: 0.00 ",
                            postageFree = false,
                            signText = "",
                            type = 0
                        }},
                        //2013-04-11 pang
                        adefault = new List<SKU>(){new SKU()
                        {
                            money = "0",
                            name = "",
                            postage = "快递: 0.00 ",
                            postageFree = false,
                            signText = "",
                            type = 0
                        }}
                    },
                    //2013-04-11 pang
                    otherServiceList = new
                    {
                    }
                },
                //2013-04-11 pang
                gatewayDO = new GatewayDO()
                {
                    changeLocationGateway = new ChangeLocationGateway()
                    {
                        queryDelivery = true,
                        queryProm = false
                    },
                    trade = new Trade()
                    {
                        addToBuyNow = "{}",
                        addToCart = "{}"
                    }
                },

            };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = new 
            {
                isSuccess=true,
                defaultModel=defaultModel
            };
            string json = jsonResult.FormatResult();
            string script = "onMdskip("   +  json +  ")";

            return JavaScript(script);
        }

    }
}
