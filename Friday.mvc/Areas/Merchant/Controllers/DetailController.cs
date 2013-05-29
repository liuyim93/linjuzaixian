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
using System.IO;

namespace Friday.mvc.Areas.Merchant.Controllers
{

    public class DetailController : Controller
    {
        private IMerchantService iMerchantService;
        private IUserService iUserService;

        //private IFoodService iFoodService;
        //private IHouseService iHouseService;
        private ICommodityService iCommodityService;

        private ISkuService iSkuService;
        private ISkuPropService iSkuPropService;
        private IPropValueService iPropValueService;
        private IPropIDService iPropIDService;

        private IOrderOfCommodityService iOrderOfCommodityService;
        //private IOrderOfFoodService iOrderOfFoodService;
        //private IOrderOfHouseService iOrderOfHouseService;

        private IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService;
        //private IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService;
        //private IValuingOfMyHouseOrderService iValuingOfMyHouseOrderService;

        public DetailController(IMerchantService iMerchantService, IUserService iUserService, ICommodityService iCommodityService, IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService, IOrderOfCommodityService iOrderOfCommodityService)
        {
            this.iMerchantService = iMerchantService;
            this.iUserService = iUserService;

            //this.iFoodService = iFoodService;
            //this.iHouseService = iHouseService;
            this.iCommodityService = iCommodityService;

            this.iValuingOfMyCommodityOrderService = iValuingOfMyCommodityOrderService;
            //this.iValuingOfMyFoodOrderService = iValuingOfMyFoodOrderService;
            //this.iValuingOfMyHouseOrderService = iValuingOfMyHouseOrderService;

            this.iOrderOfCommodityService = iOrderOfCommodityService;
            //this.iOrderOfFoodService = iOrderOfFoodService;
            //this.iOrderOfHouseService = iOrderOfHouseService;
        }

        public ActionResult Tab_Recommend(string brandId, string _ksTS, string callback)
        {
            string recommends = "({\"list\": [{\"id\": 15052401756,\"sellerId\": 890482188,\"title\": \"Nike耐克官方PRO COMBAT HYPRWRM CREW男子紧身长袖针织衫456445\",\"url\": \"http://detail.tmall.com/item.htm?id=15052401756&pos=1&uuid=0fed7c063a684b439c2f2f482767520b&scm=1003.3.03040.1_1&acm=03040.1003.247.238.15052401756_1\",\"img\": \"http://img04.taobaocdn.com/bao/uploaded/i4/12188021901974974/T14w9eXyFfXXXXXXXX_!!0-item_pic.jpg\",\"commentNum\": 0,\"rate\": 0.0,\"price\": 349.0,\"marketPrice\": 349.0,\"comments\": [{\"content\": \"很好，很不错，也很保暖， 180个子，80公斤 L号，很有型\",\"nick\": \"h***7\"},{\"content\": \"颜色非常好，比图片上的好看，但是比较肥，不够紧身，保暖性能不错，适合现在的季节穿\\n我身高186，体重86公斤，上肢肌肉发达，穿XL的都觉得肥，长短正好，要是穿L的应该就短了，没办法\",\"nick\": \"q***y\"},{\"content\": \"无论速度、质量都好得不得了\",\"nick\": \"vincenttsang\"}],\"lastBitOfSCM\": \"1_1\"}],\"vid\": 0,\"curPage\": 1,\"step\": 6,\"maxPage\": 4,\"brand\": \"耐克/Nike\",\"brandLogo\": \"http://img04.taobaocdn.com/bao/uploaded/i4/T1zD7YXnpXXXXQXDnq-90-45.png\",\"brandId\": 20578,\"acurl\": \"http://ac.atpanel.com/1.gif?cache=9842315&com=02&apply=detail&cod=1.3.1&acm=03040.1003.247.238.16246683095_1&uid=&ver=&ip=&other=&uuid=0fed7c063a684b439c2f2f482767520b\"},null)";

            string script = callback + recommends;

            return JavaScript(script);
        }



        public ActionResult Index()
        {
            string commodity_id = Request.Params["brandId"].ToString();
            Commodity commodity = iCommodityService.Load(commodity_id);
            DetailModel detailModel = new DetailModel();
            detailModel.Commodity = commodity;

            friday.core.Merchant merchant = iMerchantService.Load(commodity.Shop.Id);           

            detailModel.Merchant = merchant;
            int index = 0;

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
            //else
                if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
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
            IList<Sku> skulist = new List<Sku>();
            var sku_list = new List<SKUDO>();
            var sku_quantityList = new List<SkuQuantity>();
            var pceInfoList = new List<PriceInfo>();
            int totalquty = 0;

            dynamic deliverySkuMap = new Dictionary<string, List<SKUDO>>();
            dynamic skuQuantity = new Dictionary<string, SkuQuantity>();
            dynamic priceInfo = new Dictionary<string, PriceInfo>();

            Commodity commodity = iCommodityService.Load(itemId);
            skulist = commodity.Skus.ToList<Sku>();
           

            //=========Test=============
            //Commodity commodity = iCommodityService.Load(itemId);
            //IList<Sku> skulistreal = new List<Sku>();
            //skulistreal = commodity.Skus.ToList<Sku>();

            //IList<SkuProp> skuproplistreal = new List<SkuProp>();
            //for (int i = 0; i < skulistreal.Count; i++) 
            //{
            //    Sku sk = skulistreal[i];
            //    skuproplistreal = sk.SKUProps.ToList<SkuProp>();

            //    for (int j = 0; j<skuproplistreal.Count;j++ )
            //    {
            //        PropID ppid = skuproplistreal[j].PropID;
            //        PropValue ppvalue = skuproplistreal[j].PropValue;                   

            //    }           
            //}

            //=========Test=============

            for (int i = 0; i < skulist.Count; i++)
            {          
             deliverySkuMap.Add(skulist[i].skuId.ToString(), new List<SKUDO>(){new SKUDO()
                        {
                            money=skulist[i].price.ToString(),
                            name=skulist[i].Commodity.Name,
                            postage="快递: 13.00 EMS: 22.00 ",
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
                             price = (float)skulist[i].price,//commodity.Price,
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
                    deliveryAddress="广东广州",
                    deliverySkuMap = deliverySkuMap,
                    hasHomeDeliveryService=false,
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
                specialServiceList = "[]",
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
        public ActionResult changeLocation(string itemId)
        {
            IList<Sku> skulist = new List<Sku>();
            Commodity commodity = iCommodityService.Load(itemId);
            skulist = commodity.Skus.ToList<Sku>();

            var sku_list = new List<SKUDO>();
            dynamic skuQuantity = new Dictionary<string, SkuQuantity>();
            int totalquty = 0;

            dynamic deliverySkuMap = new Dictionary<string, List<SKUDO>>();
            for (int i = 0; i < skulist.Count; i++)
            {
                deliverySkuMap.Add(skulist[i].skuId.ToString(), new List<SKUDO>(){new SKUDO()
                        {
                            money=skulist[i].price.ToString(),
                            name=skulist[i].Commodity.Name,
                            postage="快递:"+ i+" EMS:"+i*2, //每个Sku里面对应一个费用？或者每一种Commodity，或者全店设置
                            postageFree=false,              //每个Sku里面对应一个费用？或者每一种Commodity，或者全店设置
                            signText=skulist[i].stock.ToString(),
                            type=0
                        }});
                skuQuantity.Add(skulist[i].skuId.ToString(), new SkuQuantity()
                {
                    quantity = skulist[i].stock,
                    type = skulist[i].Commodity.Version
                });
                totalquty = totalquty + skulist[i].stock;
            };

            DefaultModel defaultModel = new DefaultModel()
            {
                deliveryDO = new DeliveryDO()
                {
                    deliveryAddress = "山东滕州",
                    deliverySkuMap = deliverySkuMap,
                    hasHomeDeliveryService = false,
                    otherServiceList = "[]"
                },
           
                inventoryDO = new InventoryDO()
                {
                    icTotalQuantity = totalquty,
                    skuQuantity = skuQuantity,
                    success = true,
                    totalQuantity = totalquty,
                    type = 1
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
                specialServiceList = "[]",
            };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = new
            {
                isSuccess = true,
                defaultModel = defaultModel
            };
            string json = jsonResult.FormatResult();
            string script = "onMdskip(" + json + ")";

            return JavaScript(script);
        }
        public ActionResult ListDsrInfo(string itemId,string sellerId, string callback)
        {
            DSRModel dsrModel = new DSRModel()
            {
                dsr = new DSR()
                {
                  gradeAvg=4.8f,
                   itemId=itemId,
                   peopleNum=16,
                   periodSoldQuantity=0,
                   rateTotal=40,
                  sellerId = sellerId,
                  spuId = "203480309",
                  totalSoldQuantity=0
                }
            };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = dsrModel;
            string json = jsonResult.FormatResult();
            string script = callback + "(" + json + ")";

            return JavaScript(script);
        }
        public ActionResult ListDetailRate(string itemId,string callback)
        {

            var rateList = new List<Rate>();

            for (int i = 0; i < 10; i++)
            {
                rateList.Add(new Rate()
                  {
                      aliMallSeller = false,
                      anony = true,
                      appendComment = i.ToString(),
                      attributes = i.ToString(),
                      auctionSku = "颜色分类:" + i.ToString() + "激光紫色/帆白;尺码:37.5/6.5",
                      buyCount = 0,
                      cmsSource = "邻居",
                      displayRatePic = "b_red_1.gif",
                      displayRateSum = 5,
                      displayUserLink = "",
                      displayUserNick = "h***7",
                      displayUserNumId = "",
                      displayUserRateLink = "",
                      dsr = 5.0,
                      fromMall = true,
                      fromMemory = 0,
                      id = i.ToString(),
                      position = "",
                      rateContent = i.ToString() + "很好的鞋子，适合夏天穿",
                      rateDate = "2013-04-04 12:00:01",
                      reply = "",
                      serviceRateContent = "",
                      tamllSweetLevel = 2,
                      tmallSweetPic = "tmall-grade-t2-18.png",
                      useful = true,
                      userInfo = "",
                      userVipLevel = 0,
                      userVipPic = ""
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
               rateList = rateList,
               tags=""
           };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = new
            {
                rateDetail = rateDetailModel
            };
            string json = jsonResult.FormatResult();
            string script = callback + "(" + json + ")";

            return JavaScript(script);
        }

        public ActionResult Recommend(string itemId)
        {

            dynamic recommendList = new Dictionary<string, List<Recommend>>();

            for (int i = 0; i < 10; i++)
            {
                recommendList.Add(i.ToString(), new Recommend()
                {
                    	id="17124405607",
		                sellerId="890482188",
		                title=i+"Nike  耐克官方  AIR MAX FUSION WRM 女子训练鞋 555163",
		                url="http://detail.tmall.com/item.htm?id=17124405607&pos=1&uuid=43f8d91add60486dad032e80ea4db029&scm=1003.3.03054.1_1&acm=03054.1003.656.250.17124405607_1",
		                img="http://img04.taobaocdn.com/bao/uploaded/i4/12188019483228809/T1n8w4XfJgXXXXXXXX_!!0-item_pic.jpg",
		                commentNum=i,
		                rate=i,
		                price=584.0+i,
		                marketPrice=729.0+i,
                        lastBitOfSCM=i.ToString()
                });
            }

            RecommendDetailModel recommendDetailModel = new RecommendDetailModel()
            {
                recommend = "[" + recommendList + "]",
                acurl = "http://ac.atpanel.com/1.gif?cache=8636728&com=02&apply=detail&cod=1.4.1&acm=03054.1003.656.250.20879096818_1&uid=&ver=&ip=&other="
            };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = new
            {
                rateDetail = recommendDetailModel
            };
            string json = jsonResult.FormatResult();
            string script = "ald318(" + json+","+null+")";

            return JavaScript(script);
        }

        public ActionResult seller_info()
        {
            string html = RenderRazorViewToString("seller_info_partial",null);
            html = html.Replace("\"", "\\\"").Replace("\r\n", ""); ;
            string script = "jsonpSellerInfo(\"" + html + "\",\"J_sellerinfo\")";
            return JavaScript(script);
        }
        public ActionResult seller_info_partial()
        {
            return View();
        }
        public string RenderRazorViewToString(string viewName, object model)
        {
            ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);
                return sw.GetStringBuilder().ToString();
            }
        }
    }
}
