using System;
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
            string commodity_id = Request.Params["brandId"].ToString();
            //friday.core.Merchant merchant = iMerchantService.Load(brandId);           
            Commodity commodity = iCommodityService.Load(commodity_id);
            DetailModel detailModel = new DetailModel();
            detailModel.Commodity = commodity;
            //detailModel.Merchant = merchant;
            //int index = 0;

            //if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.餐馆)
            //{
            //    IList<Food> foods = iFoodService.GetFoodByRestaurantIDOrderByMonthAmountDesc(merchant.Id);
            //    if (foods.Count > 0)
            //    {
            //        foreach (Food f in foods)
            //        {
            //            detailModel.Foods.Add(f);

            //            IList<ValuingOfMyFoodOrder> valuingOfMyFoodOrders = iValuingOfMyFoodOrderService.GetValuingOfMyFoodOrderByFoodID(f.Id);
            //            foreach (ValuingOfMyFoodOrder v in valuingOfMyFoodOrders)
            //            {
            //                detailModel.ValuingOfMyFoodOrders[index].Add(v);
            //            }
            //            index++;
            //        }
            //    }
            //}
            //else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
            //{
            //    IList<Commodity> commoditys = iCommodityService.GetCommodityByShopIDOrderByMonthAmountDesc(merchant.Id);
            //    if (commoditys.Count > 0)
            //    {
            //        foreach (Commodity c in commoditys)
            //        {
            //            detailModel.Commoditys.Add(c);

            //            IList<ValuingOfMyCommodityOrder> valuingOfMyCommodityOrders = iValuingOfMyCommodityOrderService.GetValuingOfMyCommodityOrderByCommodityID(c.Id);
            //            foreach (ValuingOfMyCommodityOrder v in valuingOfMyCommodityOrders)
            //            {
            //                detailModel.ValuingOfMyCommodityOrders[index].Add(v);
            //            }
            //            index++;
            //        }
            //    }
            //}
            //else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.租房)
            //{
            //    IList<House> houses = iHouseService.GetHouseByRentIDOrderByMonthAmountDesc(merchant.Id);
            //    if (houses.Count > 0)
            //    {
            //        foreach (House h in houses)
            //        {
            //            detailModel.Houses.Add(h);

            //            IList<ValuingOfMyHouseOrder> valuingOfMyHouseOrders = iValuingOfMyHouseOrderService.GetValuingOfMyHouseOrderByHouseID(h.Id);
            //            foreach (ValuingOfMyHouseOrder v in valuingOfMyHouseOrders)
            //            {
            //                detailModel.ValuingOfMyHouseOrders[index].Add(v);
            //            }
            //            index++;
            //        }
            //    }
            //}

            return View(detailModel);
        }
        public ActionResult InitItemDetail(string itemId)
        {
            IList<Sku>  skulist=new List<Sku>();
            //string commdityId = Request.Params["itemId"].ToString();
            //friday.core.Merchant merchant = iMerchantService.Load(brandId);
            //string commdityId = "3804cfa1-7bcd-4aae-9ca3-e6824a3bdf7d";
            Commodity commodity = iCommodityService.Load(itemId);
            skulist = commodity.Skus.ToList<Sku>();
            
            var sku_list = new List<SKUDO>();
            var sku_quantityList=new List<SkuQuantity>();
            var pceInfoList = new List<PriceInfo>();
            int totalquty = 0;

            dynamic deliverySkuMap = new Dictionary<string, List<SKUDO>>();
            dynamic skuQuantity = new Dictionary<string, SkuQuantity>();
            dynamic priceInfo = new Dictionary<string, PriceInfo>();
            for (int i = 0; i < skulist.Count; i++)
            {          
             deliverySkuMap.Add(skulist[i].skuId.ToString(), new List<SKUDO>(){new SKUDO()
                        {
                            money=skulist[i].price.ToString(),
                            name=skulist[i].Commodity.Name,
                            postage="快递: 0.00 ",
                            postageFree=false,
                            signText=skulist[i].stock.ToString(),
                            type=0
                        }});

             skuQuantity.Add(skulist[i].skuId.ToString(), new SkuQuantity()
                        {
                             quantity=skulist[i].stock,
                             type=skulist[i].Commodity.Version
                        });
             priceInfo.Add(skulist[i].skuId.ToString(), new PriceInfo()
                        {
                             areaSold = true,
                             price =(float)skulist[i].price,
                             promotionList = null,
                             tagPrice = null,
                             umpBigPromotionDisplayPrice = null
                        });
                totalquty = totalquty + skulist[i].stock;        
            };

            DefaultModel defaultModel = new DefaultModel()
            {
                deliveryDO = new DeliveryDO()
                {
                    deliverySkuMap = deliverySkuMap,
                    otherServiceList = "[]"
                },
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
                    icTotalQuantity = totalquty,
                    skuQuantity = skuQuantity,
                    success = true,
                    totalQuantity = totalquty,
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
                    priceInfo = priceInfo,
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
                    cspuSellCountMap = new { },
                    sellCount = 32
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

        public ActionResult ListDetailRate(string itemId)
        {

            var rate_list = new List<Rate>();
            dynamic rateList = new Dictionary<string, List<Rate>>();
       
            for (int i = 0; i < 10; i++)
            {
                rateList.Add(i.ToString(), new Rate()
                  {
                         aliMallSeller=false,
			             anony=true,
			             appendComment= i.ToString(),
			             attributes= i.ToString(),
			             auctionSku="颜色分类:"+i.ToString()+"激光紫色/帆白;尺码:37.5/6.5",
			             buyCount= 0,
			             cmsSource="天猫",
			             displayRatePic="b_red_1.gif",
			             displayRateSum=5,
			             displayUserLink="",
			             displayUserNick="h***7",
			             displayUserNumId="",
			             displayUserRateLink="",
			             dsr=5.0,
			             fromMall=true,
			             fromMemory=0,
			             id=i.ToString(),
               			 position="",
			             rateContent=i.ToString()+"很好的鞋子，适合夏天穿",
			             rateDate="2013-04-04 12:00:01",
			             reply="",
			             serviceRateContent="",
			             tamllSweetLevel=2,
			             tmallSweetPic="tmall-grade-t2-18.png",
			             useful=true,
			             userInfo="",
			             userVipLevel=0,
			             userVipPic=""
                        });
            }

            RateDetailModelObject rateDetailModel = new RateDetailModelObject()
           {
               paginator = new Paginator()
               {
                    items=318,
			        lastPage=16,
			        page=1
               },
               rateCount = new RateCount()
               {
                  	shop=0,
			        total=0,
			        used=12
               },
               rateDanceInfo = new RateDanceInfo()
               {
                   currentMilles="1366244482350",
			       intervalMilles="215087439000",
			       showChooseTopic=false,
			       storeType=1
               },
               rateList ="["+rateList+"]",
               tags=""
           };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = new
            {
                rateDetail = rateDetailModel
            };
            string json = jsonResult.FormatResult();
            string script = "jsonp347(" + json + ")";

            return JavaScript(script);
        }

    }
}
