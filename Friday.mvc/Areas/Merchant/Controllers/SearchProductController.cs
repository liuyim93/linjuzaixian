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
using friday.core.components;
using System.Net;
namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class SearchProductController : Controller
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
        private IUserService iUserService;
        private ISchoolService iSchoolService;
        private ISkuService iSkuService;

        public SearchProductController(ISkuService iSkuService, IMerchantService iMerchantService, IGlobalGoodsTypeService iGlobalGoodsTypeService, IShopService iShopService, ICommodityService iCommodityService, IUserService iUserService, ISchoolService iSchoolService)
        {
            this.iSkuService = iSkuService;
            this.iMerchantService = iMerchantService;
            this.iGlobalGoodsTypeService = iGlobalGoodsTypeService;
            //this.iRentService = iRentService;
            //this.iRestaurantService = iRestaurantService;
            this.iShopService = iShopService;
            this.iCommodityService = iCommodityService;
            //this.iFoodService = iFoodService;
            //this.iHouseService = iHouseService;
            this.iUserService = iUserService;
            this.iSchoolService = iSchoolService;
        }
        public ActionResult SearchGoods()
        {
                   

            return View();
        }
        //2013-05-22 basilwang 增加排序   具体值 p为价格从低到高   pd为价格从高到低  st为默认排序  td为总销量从高到低  d为月销量从高到低 pt为发布时间排序 
        public ActionResult Index(string selectSchool,string page,string keyword, string price1, string price2 ,string pagenum,string cat,string sort,string style,string type)
        {
            type=Request.Params["mtype"];
            //2013-05-22 basilwang 默认为s
            if (string.IsNullOrEmpty(sort) )
            {
                sort = "s";
            }
            //2013-05-23 basilwang 默认为g
            if (string.IsNullOrEmpty(style))
            {
                style = "g";
            }
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
                keyword = "";
            }
         

            SearchProductModel searchProductModel = new SearchProductModel();


            int currentPage = (page == "" || page == null) ? 1 : Convert.ToInt32(page);
            //page 边界限定
            if (!String.IsNullOrEmpty(page) && !String.IsNullOrEmpty(pagenum))
            {
                if (Convert.ToInt32(page) <= 1)
                {
                    currentPage = 1;
                    page = "1";
                }
                else if (Convert.ToInt32(page) >= Convert.ToInt32(pagenum))  //pageCount即PageNum
                {
                    currentPage = Convert.ToInt32(pagenum);
                    page = pagenum;
                }
              
            }
            else 
            {
                currentPage = 1;
            }

            int numPerPageValue = 50;
            int total;
            int start = (currentPage - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<Commodity> commList;
            if (!string.IsNullOrEmpty(type))
            {
                friday.core.EnumType.MerchantTypeEnum mechantType=(friday.core.EnumType.MerchantTypeEnum)Int32.Parse(type);
                commList = iCommodityService.GetCommodityByType(page, dbprice1, dbprice2, start, limit, out total, sort, mechantType);
            }
            else
            {
                 commList = iCommodityService.GetCommodityByKeywordAndPrice(page, keyword, dbprice1, dbprice2, start, limit, out total, cat, sort,selectSchool);
            }
            if (cat == "" || cat == null)
            {
                searchProductModel.headGlobalGoodsType = iGlobalGoodsTypeService.GetFirstLevelAll();

                foreach (GlobalGoodsType globalGoodsType in searchProductModel.headGlobalGoodsType)
                {
                    IList<GlobalGoodsType> getFamily = iGlobalGoodsTypeService.GetChildrenFromParentID(globalGoodsType.Id);
                    searchProductModel.listGlobalGoodsTypes.Add(getFamily);
                    List<int> listGlobalGoodsTypesNum = new List<int>();
                    foreach (GlobalGoodsType g in getFamily)
                    {
                        listGlobalGoodsTypesNum.Add(iCommodityService.GetCommodityCountByFamily(g.Id));
                    }
                    searchProductModel.listGlobalGoodsTypesNum.Add(listGlobalGoodsTypesNum);
                    searchProductModel.headGlobalGoodsTypeNum.Add(iCommodityService.GetCommodityCountByFamily(globalGoodsType.Id));
                }
            }
            else
            {
                //类型列表数据
                GlobalGoodsType formCat = iGlobalGoodsTypeService.Load(cat);
                searchProductModel.headGlobalGoodsType.Add(formCat);
                IList<GlobalGoodsType> getFamily = iGlobalGoodsTypeService.GetChildrenFromParentID(formCat.Id);
                searchProductModel.listGlobalGoodsTypes.Add(getFamily);
                List<int> listGlobalGoodsTypesNum = new List<int>();
                foreach (GlobalGoodsType g in getFamily)
                {
                    listGlobalGoodsTypesNum.Add(iCommodityService.GetCommodityCountByFamily(g.Id));
                }
                searchProductModel.listGlobalGoodsTypesNum.Add(listGlobalGoodsTypesNum);
                searchProductModel.headGlobalGoodsTypeNum.Add(iCommodityService.GetCommodityCountByFamily(formCat.Id));

                //类型Bar数据
                string[] formCartFamily = formCat.Family.Split(',');
                if (formCartFamily.Length != 1)
                {
                    for (int i = 0; i < formCartFamily.Length - 1; i++)
                    {
                        GlobalGoodsType temp = iGlobalGoodsTypeService.Load(formCartFamily[i]);
                        searchProductModel.headBarGlobalGoodsType.Add(temp);
                        IList<GlobalGoodsType> globalGoodsTypes = iGlobalGoodsTypeService.GetChildrenFromParentID(temp.ParentID);
                        globalGoodsTypes.Remove(temp);
                        globalGoodsTypes.Insert(0, temp);
                        searchProductModel.listBarGlobalGoodsType.Add(globalGoodsTypes);

                    }
                }

                searchProductModel.headBarGlobalGoodsType.Add(formCat);
                IList<GlobalGoodsType> formCatTypes = iGlobalGoodsTypeService.GetChildrenFromParentID(formCat.ParentID);
                formCatTypes.Remove(formCat);
                formCatTypes.Insert(0, formCat);
                searchProductModel.listBarGlobalGoodsType.Add(formCatTypes);
            }//else

            searchProductModel.Commoditys = commList;
            searchProductModel.count = commList.Count;

            //2013-05-25根据CommodityList找到每一个Commodity的Sku的价格最小值
            //IList<Sku> minPriceSkuComlist = new List<Sku>();
            //for (int i=0;i<commList.Count ;i++ )
            //{
            //    Sku minpricesku = iSkuService.GetMinPriceSkusByCommodityID(commList[i].Id);
            //    minPriceSkuComlist.Add(minpricesku);
            //}
            //searchProductModel.minPriceSkuList = minPriceSkuComlist;

            //需要根据 commlist  找出其对应的 Merchants            
            foreach (var i in commList)
            {
                bool flag = true;
                foreach (var j in  searchProductModel.Merchants)
                {
                    if (i.Shop.Name == j.Name)
                    {
                        flag = false;
                    }
                }

                if(flag)
                {             
                  searchProductModel.Merchants.Add(i.Shop);
                }
            }

            //商品推荐
            IList<Commodity> recommendCommdties= iCommodityService.GetHotRecommendCommoditiesByKeyWord("");
            searchProductModel.recommendComdties = recommendCommdties;

            IList<Sku> minRecommendSkuList = new List<Sku>();
            for (int i = 0; i < recommendCommdties.Count; i++)
            {
                Sku minpricesku = iSkuService.GetMinPriceSkusByCommodityID(recommendCommdties[i].Id);
                minRecommendSkuList.Add(minpricesku);
            }
            searchProductModel.minRecommendSkuList = minRecommendSkuList;

            //您是不是想找。。。
            IList<GlobalGoodsType> GdsTpList = iGlobalGoodsTypeService.GetSimilarGoodsTypeListInThirdLevelByKeyword(keyword);
            searchProductModel.globalGoodsTypes = GdsTpList;

            searchProductModel.currentPage = currentPage;
            searchProductModel.pageNum = total / numPerPageValue + 1;
            searchProductModel.count = total;


            ViewData["mtype"] = type;
            ViewData["skeyword"] = keyword;
            ViewData["sprice1"] = price1;
            ViewData["sprice2"] = price2;
            ViewData["pagenum"] = total / numPerPageValue + 1;
            //2013-05-23 basilwang 增加cat 和sort
            ViewData["cat"] = cat;
            ViewData["sort"] = sort;
            ViewData["style"] = style;

            //2013-05-24 wanghaichuan school
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            if (systemUser != null)
            {
                School currentUserSchool = systemUser.School;
                School currentUserParentSchool;
                //当前用户所属 省 市
                //string[] family = currentUserSchool.Family.Split(',');
                //searchProductModel.currentFirstSchool = iSchoolService.Load(family[0]);
                //searchProductModel.currentSecondSchool = iSchoolService.Load(family[1]);

                //同级地区
                //searchProductModel.siblingSchools = iSchoolService.GetChildrenFromParentID(currentUserSchool.ParentID);

                //上一级地区
                //searchProductModel.parentSiblingSchools = iSchoolService.GetChildrenFromParentID(currentUserParentSchool.ParentID);

                string[] family = currentUserSchool.Family.Split(',');
                if (family.Length == 0)
                {
                    searchProductModel.currentFirstSchool = currentUserSchool;
                    //只有同级地区
                    searchProductModel.siblingSchools = iSchoolService.GetChildrenFromParentID(currentUserSchool.ParentID);
                    searchProductModel.parentSiblingSchools = null;
                }
                else
                {
                    currentUserParentSchool = iSchoolService.Load(currentUserSchool.ParentID);

                    searchProductModel.currentFirstSchool = iSchoolService.Load(currentUserSchool.ParentID);
                    searchProductModel.currentSecondSchool = currentUserSchool;

                    searchProductModel.siblingSchools = iSchoolService.GetChildrenFromParentID(currentUserSchool.ParentID);
                    if (currentUserParentSchool.ParentID == null)
                    {
                        searchProductModel.parentSiblingSchools = iSchoolService.GetChildrenFromParentID(null);
                    }
                    else
                    {
                        searchProductModel.parentSiblingSchools = iSchoolService.GetChildrenFromParentID(currentUserParentSchool.ParentID);
                    }
                }
            }
            else
            {
                string[] areaString = friday.core.components.IPAndLocationHelper.GetAddress();

                //取IP “山东省济南市 山东经济学院” 的经济学院
                string[] sArray = areaString[1].Split(' ');

                School ipLeafSchool = iSchoolService.FilterSchoolByAreaString(areaString[1]).FirstOrDefault();
                School ipLeafParentSchool;
                if (ipLeafSchool != null)
                {
                    //用户未登录，但通过IP可以大体定位
                    string[] family = ipLeafSchool.Family.Split(',');
                    if (family.Length == 0)
                    {
                        searchProductModel.currentFirstSchool = ipLeafSchool;
                        //只有同级地区
                        searchProductModel.siblingSchools = iSchoolService.GetChildrenFromParentID(ipLeafSchool.ParentID);
                        searchProductModel.parentSiblingSchools = null;
                    }
                    else
                    {
                        //当前获取的ip地址为山东经济学院
                        ipLeafParentSchool = iSchoolService.Load(ipLeafSchool.ParentID);

                        searchProductModel.currentFirstSchool = iSchoolService.Load(ipLeafSchool.ParentID);
                        searchProductModel.currentSecondSchool = ipLeafSchool;

                        searchProductModel.siblingSchools = iSchoolService.GetChildrenFromParentID(ipLeafSchool.ParentID);
                        if (ipLeafParentSchool.ParentID == null)
                        {
                            searchProductModel.parentSiblingSchools = iSchoolService.GetChildrenFromParentID(null);
                        }
                        else
                        {
                            searchProductModel.parentSiblingSchools = iSchoolService.GetChildrenFromParentID(ipLeafParentSchool.ParentID);
                        }
                    }

                }
                else
                {
                    //用户未登录，且通过IP也不可定位
                    searchProductModel.currentFirstSchool = null;
                    searchProductModel.currentSecondSchool = null;

                    //最顶级地区
                    searchProductModel.parentSiblingSchools = iSchoolService.GetChildrenFromParentID(null);
                }
            }

            ViewData["selectSchool"] = selectSchool;

            return View(searchProductModel);
        }

        public ActionResult getAllBrotherCats(string cat)
        {
            GlobalGoodsType globalGoodsType = iGlobalGoodsTypeService.Load(cat);

            IList<GlobalGoodsType> formCatTypes = iGlobalGoodsTypeService.GetChildrenFromParentID(globalGoodsType.ParentID);
            formCatTypes.Remove(globalGoodsType);
            formCatTypes.Insert(0, globalGoodsType);
            Friday.mvc.Areas.Merchant.Models.CategoryBar categoryBar = new Models.CategoryBar(); 
            foreach (GlobalGoodsType g in formCatTypes)
            {
                Friday.mvc.Areas.Merchant.Models.CategoryItem categoryItem = new Models.CategoryItem()
                {
                    href = "http://localhost:7525/Merchant/SearchProduct?cat="+ g.Id +"&amp;s=0&amp;n=0&amp;sort=s&amp;style=g&amp;zk_type=0&amp;vmarket=0&amp;search_condition=23&amp;pic_detail=1&amp;area_code=370100&amp;from=sn_1_rightnav&amp;active=1",
                    title = g.Name,
                    atp = "1,cat-dropdown,,,,"+g.Id+",rightnav,"
                };
                categoryBar.categoryItems.Add(categoryItem);
            }

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = categoryBar.categoryItems;
            string json = jsonResult.FormatResult();
            string script = json;

            return JavaScript(script);
        }
    }
}
