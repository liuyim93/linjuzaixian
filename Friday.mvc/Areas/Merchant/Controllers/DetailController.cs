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

        private ISkuService iSkuService;
        private ISkuPropService iSkuPropService;
        private IPropValueService iPropValueService;
        private IPropIDService iPropIDService;

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
            IList<Sku>  skulist=new List<Sku>();
            //string brandId = Request.Params["brandId"].ToString();
            //friday.core.Merchant merchant = iMerchantService.Load(brandId);
            string commdityId = "dd35ae8d-2468-4cd9-8e56-ffe3d52af94d";
            Commodity commodity = iCommodityService.Load(commdityId);
            skulist = commodity.Skus.ToList<Sku>();
            
            var sku_list = new List<SKUDO>();
            var sku_quantityList=new List<SkuQuantity>();

            for (int i = 0; i < skulist.Count; i++)
            {
              SKUDO  skuvommdty= new SKUDO()
                     {
                        money=skulist[i].price.ToString(),
                        name=skulist[i].Commodity.Name,
                        postage="快递: 0.00 ",
                        postageFree=false,
                        signText=skulist[i].stock.ToString(),
                        type=0
                      };
                sku_list.Add(skuvommdty);
             
              SkuQuantity  skuquty=new SkuQuantity()
                    {
                     quantity=skulist[i].stock,
                      type=skulist[i].Commodity.Version
                    };
                sku_quantityList.Add(skuquty);
              }

            
            DefaultModel defaultModel = new DefaultModel()
            {
                deliveryDO = new DeliveryDO()
                {
                    deliverySkuMap = sku_list,
                    //2013-04-11 pang
                    otherServiceList = "[]"
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
                        addToBuyNow = new { },
                        addToCart = new { }
                    }
                },
                inventoryDO = new InventoryDO()
                {
                    icTotalQuantity = 45,
                    skuQuantity = sku_quantityList,
                    success = true,
                    totalQuantity = 45,
                    type = 1
                },
                itemPriceResultDO = new ItemPriceResultDO()
                {
                    areaId = "370100",
                    campaignInfo = null,
                    largeScalePromOfficial = false,
                    largeScalePromPeriod = -1,
                    largeScalePromUnOfficial = false,
                    largeScalePromUnderFiftyPOff = false,
                    priceInfo = new
                    {
                        p41506008322 = new List<PriceInfo>{new PriceInfo()
                       {
                           areaSold=true,
                           price=699,
                           promotionList=null,
                           tagPrice=null,
                           umpBigPromotionDisplayPrice=null
                       }},
                        p41506008333 = new List<PriceInfo>{new PriceInfo()
                       {
                           areaSold=true,
                           price=699,
                           promotionList=null,
                           tagPrice=null,
                           umpBigPromotionDisplayPrice=null
                       }},
                    },
                    promType = null,
                    queryProm = false,
                    umpBigPromotionItem = false,
                    wanrentuanInfo = null
                },
                memberRightDO = new MemberRightDO()
                {
                    discount = 0,
                    freePostage = false,
                    gradeName = null,
                    level = 0,
                    shopMember = false,
                    success = false,
                    times = 0
                },
                miscDO = new MiscDO()
                {
                    sellCountDown = 0,
                    systemTime = "1365659724759"
                },
                sellCountDO = new SellCountDO()
                {
                    cspuSellCountMap = "{}",
                    sellCount = 0
                },
                specialServiceList = "{}",
                tradeResult = new TradeResult()
                {
                    cartEnable = true,
                    cartType = 2,
                    miniTmallCartEnable = true,
                    param = null,
                    tradeDisableTypeEnum = null,
                    tradeEnable = true,
                    tradeType = null
                },
                userInfoDO = new UserInfoDO()
                {
                    juKeBuyerLogin = false,
                    loginCC = false,
                    loginUserType = "buyer"
                }

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
