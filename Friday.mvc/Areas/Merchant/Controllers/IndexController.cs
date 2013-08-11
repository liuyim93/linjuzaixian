using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using friday.core.domain;
using Friday.mvc.Models;
using friday.core;
using MvcPaging;
namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class IndexController : Controller
    {
        //
        // GET: /Merchant/Search/
        private IMerchantService iMerchantService;
        private IGlobalGoodsTypeService iGlobalGoodsTypeService;
        //private IRestaurantService iRestaurantService;
        //private IRentService iRentService;
        private IShopService iShopService;
        //private IFoodService iFoodService;
        //private IHouseService iHouseService;
        private ICommodityService iCommodityService;
        private ISkuService iSkuService;

        public IndexController(IMerchantService iMerchantService, IGlobalGoodsTypeService iGlobalGoodsTypeService, IShopService iShopService, ICommodityService iCommodityService, ISkuService iSkuService)
        {
            this.iMerchantService = iMerchantService;
            this.iGlobalGoodsTypeService = iGlobalGoodsTypeService;
            //this.iRentService = iRentService;
            //this.iRestaurantService = iRestaurantService;
            this.iShopService = iShopService;
            this.iCommodityService = iCommodityService;
            //this.iFoodService = iFoodService;
            //this.iHouseService = iHouseService;
            this.iSkuService = iSkuService;
        }
        public ActionResult SearchGoods(string page ,string scid,string goodTypeId)// ,string baobei_type,string searchRange)//,string goodsTypeId)
        {

            IndexModel merchantIndexModel = new IndexModel();

            //scid = "885009d2-e184-41c3-913e-0b0caa058d41";
        
            friday.core.Merchant merchant = iMerchantService.Load(scid);
            merchantIndexModel.SingleMerchant = merchant;
            if (!string.IsNullOrEmpty(goodTypeId))
            {
                //merchantIndexModel.SingleMerchantGoodsType = iGlobalGoodsTypeService.Load(goodTypeId);
            }
            else 
            {
                goodTypeId = "0";
            }
            //merchantIndexModel.merchantGoodsTypes = merchant.MerchantGoodsTypes.ToList();
            int currentPage = (page == "" || page == null) ? 1 : Convert.ToInt16(page);
            int numPerPageValue = 20;
            int total;
            int start = (currentPage - 1) * numPerPageValue;
            int limit = numPerPageValue;

            //if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
            //{
                IList<Commodity> myCommodities = this.iCommodityService.GetCommodityByShopIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(scid, goodTypeId, start, limit, out total);
                Shop shop = this.iShopService.Load(scid);
                merchantIndexModel.SingleShop = shop;
                merchantIndexModel.Commoditys = myCommodities;

                IList<Sku> minPriceSkuComlist = new List<Sku>();
                for (int i = 0; i < myCommodities.Count; i++)
                {
                    Sku minpricesku = iSkuService.GetMinPriceSkusByCommodityID(myCommodities[i].Id);
                    minPriceSkuComlist.Add(minpricesku);
                }
                merchantIndexModel.minPriceSkuList = minPriceSkuComlist;
            //}
            //else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.餐馆)
            //{
            //    IList<Food> myFoods = this.iFoodService.GetFoodByRestaurantIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(scid, goodTypeId, start, limit, out total);
            //    Restaurant restaurant = this.iRestaurantService.Load(scid);
            //    merchantIndexModel.SingleRestaurant = restaurant;
            //    merchantIndexModel.Foods = myFoods;
            //}
            //else
            //{
            //    IList<House> myHouses = this.iHouseService.GetHouseByRentIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(scid, goodTypeId, start, limit, out total);
            //    Rent rent = this.iRentService.Load(scid);
            //    merchantIndexModel.SingleRent = rent;
            //    merchantIndexModel.Houses = myHouses;
            //}
            merchantIndexModel.currentPage = currentPage;
            merchantIndexModel.pageNum = total / numPerPageValue + 1;
            merchantIndexModel.count = total;
            ViewData["sscid"] = scid;
            ViewData["sgoodTypeId"] = goodTypeId;

            return View("Index",merchantIndexModel);
        }

        //2013-05-22 basilwang 增加排序   具体值 p为价格从低到高   pd为价格从高到低  st为默认排序  td为总销量从高到低  d为月销量从高到低 pt为发布时间排序 
        public ActionResult Index(string page, string scid, string orderType, string viewType, string keyword, string price1, string price2, string goodTypeId,string pagenum,string sort)//,string style)// ,string baobei_type,string searchRange)//,string goodsTypeId)
        {
            //2013-05-22 basilwang 默认为s
            if (string.IsNullOrEmpty(sort))
            {
                sort = "md"; //默认按价格升序排列 
            }
            //2013-05-23 basilwang 默认为g
            //if (string.IsNullOrEmpty(style))
            //{
            //    style = "g";
            //}
            double dbprice1, dbprice2;
            if (string.IsNullOrEmpty(price1))
            {
                dbprice1 = -1; //约定-1 表示为空
            }
            else 
            {
                dbprice1 = Convert.ToDouble(price1);
            }
            if (string.IsNullOrEmpty(price2))
            {
                dbprice2 = -1;
            }
            else
            {
                dbprice2 = Convert.ToDouble(price2);
            }
            if (!string.IsNullOrEmpty(Request.Params["page"]))
            {
                page = Request.Params["page"];
            }
            if (string.IsNullOrEmpty(keyword))
            {
                keyword =""; 
            }
            IndexModel merchantIndexModel = new IndexModel();
            friday.core.Merchant merchant;
            //scid = "193cf240-cf1e-4eb7-b944-d3a561eb5ffb";
            try
            {
                 merchant = iMerchantService.Get(scid);
            }
            catch (Exception ex)
            {
                return Redirect("/Index.html");
            }
            if (merchant.IsDelete == true)
            {
                return Redirect("/Index.html");
            }
            merchantIndexModel.SingleMerchant =merchant;
            if (!string.IsNullOrEmpty(goodTypeId))
            {
                //merchantIndexModel.SingleMerchantGoodsType = iGlobalGoodsTypeService.Load(goodTypeId);
            }
            else 
            {
                goodTypeId = "0";
            }
            //merchantIndexModel.merchantGoodsTypes = merchant.MerchantGoodsTypes.ToList();
            int currentPage = (page == "" || page == null) ? 1 : Convert.ToInt16(page);
            //page 边界限定
            if (!String.IsNullOrEmpty(page) && !String.IsNullOrEmpty(pagenum))
            {
                if (Convert.ToInt16(page) <= 1)
                {
                    currentPage = 1;
                    page = "1";
                }
                else if (Convert.ToInt16(page) >= Convert.ToInt16(pagenum))  //pageCount即PageNum
                {
                    currentPage = Convert.ToInt16(pagenum);
                    page = pagenum;
                }

            }
            else
            {
                currentPage = 1;
            }

            int numPerPageValue = 20;
            int total;
            int start = (currentPage - 1) * numPerPageValue;
            int limit = numPerPageValue;
   
         
       
            //IList<Commodity> myCommodities = this.iCommodityService.GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(scid, keyword, dbprice1, dbprice2, goodTypeId, orderType, start, limit, out total);
            IList<Commodity> myCommodities = this.iCommodityService.GetCommodityByShopIDAndKeywordAndPrice(scid,page, keyword, dbprice1, dbprice2, start, limit, out total ,sort);
            
            Shop shop = this.iShopService.Load(scid);
            merchantIndexModel.SingleShop = shop;
            merchantIndexModel.Commoditys = myCommodities;

            IList<Sku> minPriceSkuComlist = new List<Sku>();
            for (int i = 0; i < myCommodities.Count; i++)
            {
                Sku minpricesku = iSkuService.GetMinPriceSkusByCommodityID(myCommodities[i].Id);
                minPriceSkuComlist.Add(minpricesku);
            }
            merchantIndexModel.minPriceSkuList = minPriceSkuComlist;

            merchantIndexModel.currentPage = currentPage;
            merchantIndexModel.pageNum = total / numPerPageValue + 1;
            merchantIndexModel.count = total;
            ViewData["skeyword"] = keyword;
            ViewData["sprice1"] = price1;
            ViewData["sprice2"] = price2;
            ViewData["sviewType"] = viewType;
            ViewData["sorderType"] = orderType;
            ViewData["sscid"] = scid;
            ViewData["sgoodTypeId"] = goodTypeId;
            ViewData["sort"] = sort;
           

            return View(merchantIndexModel);
        }

    }
}
