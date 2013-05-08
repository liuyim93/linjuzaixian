using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using friday.core;
using friday.core.domain;
using NHibernate;
using friday.core.services;
using friday.core.components;
using friday.core.repositories;
using friday.core.EnumType;
namespace Friday.Test2
{

   [TestFixture]
    public class PopulateFakeShopDataTest
    {
       private List<SystemUser> systemUserList = new List<SystemUser>();
       private List<LoginUser> loginUserList = new List<LoginUser>();
       private List<Shop> shopList = new List<Shop>();
       private List<School> schoolList = new List<School>();
       private List<Commodity> commodityOfShop1List = new List<Commodity>();
       private List<Commodity> commodityOfShop2List = new List<Commodity>();
       private IList<MerchantCategory> merchantCategoryList = new List<MerchantCategory>();
       IMerchantCategoryRepository iMerchantCategoryRepository = UnityHelper.UnityToT<IMerchantCategoryRepository>();
       IGlobalGoodsTypeRepository globalGoodsTyperep = new GlobalGoodsTypeRepository();
      
       private readonly int SYSTEM_USER_COUNT = 500;
       private readonly int MY_FAVAORITE_SHOP_COUNT = 5;
       private readonly int SHOP_COUNT = 10;  //we double SHOP_COUNT  eg  10*2
       private readonly int FOOD_COUNT_OF_SHOP = 10;
       private readonly int ORDER_COUNT = 500;
       private readonly int SHCOOL_COUNT = 10;
       //string[] mCategory = {"烟酒", "副食品", "超市", "军用品"};

       [SetUp]
        public void init()
        {
            for (int i = 0; i < SYSTEM_USER_COUNT; i++)
            {
                add_SystemUser_Address_LoginUser();
            }

            //add_MerchantCategory();
                    
            for (int i = 0; i < SHOP_COUNT; i++)
            {
                merchantCategoryList = iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.百货);
                if (merchantCategoryList.Count==0)
                {
                    throw new Exception("You must run PopulateRealPermissionDataTest.cs  First");
                }
                int mCRnd = new Random().Next(merchantCategoryList.Count);//mCategory.Length
                //string mCategoryName = mCategory[mCRnd];
                MerchantCategory merchantCategory = merchantCategoryList[mCRnd];
                //merchantCategory = new MerchantCategoryRepository().SearchByMerchantCategoryName(mCategoryName);
                add_Shop_Commodity_ShopCommodityType(i, merchantCategory);
            }
            add_School_Shop();
            add_Shop_to_MyFavorite();
            add_Random_Xiaoer_to_Shop();
            add_Random_MyOrder();
        }
       //2013-02-17  pangfuxing  add MerchantCategory
       //private void add_MerchantCategory() 
       //{
       //    for (int i = 0; i < mCategory.Length; i++)
       //    {
       //        string merchantcategoryid = Guid.NewGuid().ToString();
       //        MerchantCategory merchantCategory = new MerchantCategory(merchantcategoryid)
       //        {
       //            MerchantCategoryName = mCategory[i],
       //            MerchantType = MerchantTypeEnum.百货
       //        };
       //        new MerchantCategoryRepository().SaveOrUpdate(merchantCategory);
       //    }
                 
       //}

       private void add_SystemUser_Address_LoginUser()
       {
           string systemuserid = Guid.NewGuid().ToString();
           string loginuserid = Guid.NewGuid().ToString();
           string tel;
           tel= "187" + get_random_number_with_fixed_width(8);
           var systemUser=(from u in loginUserList select u).Where(o=>o.LoginName=="john"+tel).FirstOrDefault();
           while(systemUser!=null)
           {
               tel = "187" + get_random_number_with_fixed_width(8);
               systemUser = (from u in loginUserList select u).Where(o => o.LoginName == "john" + tel).FirstOrDefault();
           }
           SystemUser systemUser_1 = new SystemUser(systemuserid)
           {
               Email = "john" +  tel +"@163.com",
               Tel = tel,
               Name = "john" + tel,
               //UserType=0,
               Description = "我NO是测试账户",

           };
           Address address = new Address()
           {
               AddressName = "山东财经大学" + get_random_number_with_fixed_width(2) + "号宿舍楼" + get_random_number_with_fixed_width(3),
               BackupTel = "187" + get_random_number_with_fixed_width(8),
               Email = "john" + tel + "@163.com",
               Linkman = "john" + tel,
               QQ = get_random_number_with_fixed_width(8),
               Tel = tel,
               Weixin = get_random_number_with_fixed_width(7),
               SystemUser = systemUser_1
           };

           ShoppingCart shopCart = new ShoppingCart()
           {
               SystemUser = systemUser_1
           };
           systemUser_1.ShoppingCarts.Add(shopCart);
           systemUser_1.Addresses.Add(address);

           //new SystemUserRepository().SaveOrUpdate(systemUser_1);
           //2013-02-04 lampard it can save shopCart
           LoginUser loginUser = new LoginUser(loginuserid)
           {
               SystemUser = systemUser_1,
               IsAdmin = false,
               LoginName = "john" + tel,
               Password = "john",
               //UserType = UserTypeEnum.会员用户
           };
           systemUser_1.LoginUser = loginUser;
           new LoginUserRepository().SaveOrUpdate(loginUser);

           systemUserList.Add(systemUser_1);
           loginUserList.Add(loginUser);

       }
       private void add_Shop_Commodity_ShopCommodityType(int index, MerchantCategory merchantCategory)
       {      

           string commodityid1;
           string commodityid2;
           //2013-2-4 lampard 
           //we should save ShopCommodityType before we give it to the commodity
           Shop shop = new Shop()
           {
               Activity = "9折",
               Address = "山东财经大学舜耕",
               Bulletins = "五一促销",
               Description = "just come",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "沃尔玛"+index.ToString(),
               Owener = "haha",
               ShortName = "yinzuo"+index.ToString(),
               Tel = "18799999992",
               Rate = 0.8,
               ShopStatus = ShopStatusEnum.接受预定,
               MerchantCategory = merchantCategory
              
           };

          
           //MerchantGoodsType shopCommodityTye_1 = new MerchantGoodsType() {  Merchant = shop, GoodsType = "文具" };
           //MerchantGoodsType shopCommodityTye_2 = new MerchantGoodsType() {  Merchant = shop, GoodsType = "服饰" };
           //shop.MerchantGoodsTypes.Add(shopCommodityTye_1);
           //shop.MerchantGoodsTypes.Add(shopCommodityTye_2);

           new ShopRepository().SaveOrUpdate(shop);

           //创建Merchant的管理员用户
           IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
           ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

           LoginUser lu1 = new LoginUser();
           lu1.LoginName = "Login" + shop.Name;
           lu1.Password = "LPass" + shop.Tel;
           //lu1.UserType = UserTypeEnum.商店;
           iLoginUserRepository.SaveOrUpdate(lu1);

           LoginUserOfMerchant lum = new LoginUserOfMerchant();
           lum.Merchant = shop;
           lum.LoginUser = lu1;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum);



           for (int i = 0; i < FOOD_COUNT_OF_SHOP; i++)
           {
               commodityid1 = Guid.NewGuid().ToString();
               Commodity commodity_1 = new Commodity(commodityid1) 
               {
                   Name = "铁观音"+i.ToString(),
                   Price = 10,
                   Image = "image/1212/img",
                   IsDiscount = false,
                   InventoryCount = 100,
                   GlobalGoodsType = globalGoodsTyperep.GetGlobalGoodsTypeByName("铁观音"),
                   Shop = shop,

               };
               shop.Commodities.Add(commodity_1);
               commodityOfShop1List.Add(commodity_1);
           }

           for (int i = 0; i < FOOD_COUNT_OF_SHOP; i++)
           {
               commodityid2 = Guid.NewGuid().ToString();
               Commodity commodity_2 = new Commodity(commodityid2)
               {
                   Name = "白茶" + i.ToString(),
                   Price = 15,
                   Image = "image/121.png",
                   IsDiscount = true,
                   InventoryCount = 200,
                   DiscountInventoryCount = 100,
                   GlobalGoodsType = globalGoodsTyperep.GetGlobalGoodsTypeByName("白茶"),
                   DiscountPrice = 10,
                   Shop = shop,
                   IsLimited = true,

               };
               shop.Commodities.Add(commodity_2);
               commodityOfShop1List.Add(commodity_2);
           }


           new ShopRepository().SaveOrUpdate(shop);
           shopList.Add(shop);

          Shop  shop2 = new Shop()
           {
               Activity = "8折",
               Address = "山东财经大学燕山",    
               Bulletins = "国庆促销",
               Description = "国庆促销",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "家乐福" + index.ToString(),
               Owener = "baobao",
               ShortName = "darunfa" + index.ToString(),
               Tel = "18799999992",          
               Rate = 0.8,              
               ShopStatus = ShopStatusEnum.接受预定,
               MerchantCategory = merchantCategory
              
              
           };

           //shopCommodityTye_1 = new MerchantGoodsType() { Merchant = shop2,  GoodsType = "食品" };
           //shopCommodityTye_2 = new MerchantGoodsType() {  Merchant = shop2,  GoodsType = "酒水" };
           //shop2.MerchantGoodsTypes.Add(shopCommodityTye_1);
           //shop2.MerchantGoodsTypes.Add(shopCommodityTye_2);

           new ShopRepository().SaveOrUpdate(shop2);


           LoginUser lu2 = new LoginUser();
           lu2.LoginName = "Login" + shop2.Name;
           lu2.Password = "LPass" + shop2.Tel;
           //lu2.UserType = UserTypeEnum.商店;
           iLoginUserRepository.SaveOrUpdate(lu2);

           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = shop2;
           lum2.LoginUser = lu2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);


           for (int i = 0; i < FOOD_COUNT_OF_SHOP; i++)
           {
               commodityid1 = Guid.NewGuid().ToString();
               Commodity commodity_1 = new Commodity(commodityid1)
               {
                   Name = "五粮液" + i.ToString(),
                   Price = 10,
                   Image = "image/1212/img",
                   IsDiscount = false,
                   InventoryCount = 100,
                   GlobalGoodsType = globalGoodsTyperep.GetGlobalGoodsTypeByName("白酒"),
                   Shop = shop2,

               };
               shop2.Commodities.Add(commodity_1);
               commodityOfShop2List.Add(commodity_1);
           }

           for (int i = 0; i < FOOD_COUNT_OF_SHOP; i++)
           {
               commodityid2 = Guid.NewGuid().ToString();
               Commodity commodity_2 = new Commodity(commodityid2)
               {
                   Name = "拉菲" + i.ToString(),
                   Price = 15,
                   Image = "image/121.png",
                   IsDiscount = true,
                   InventoryCount = 200,
                   DiscountInventoryCount = 100,
                   GlobalGoodsType = globalGoodsTyperep.GetGlobalGoodsTypeByName("洋酒"),
                   DiscountPrice = 10,
                   Shop = shop2,
                   IsLimited = true,

               };
               shop2.Commodities.Add(commodity_2);
               commodityOfShop2List.Add(commodity_2);
           }


           new ShopRepository().SaveOrUpdate(shop2);
           shopList.Add(shop2);
       }
       private void add_School_Shop()
       {
           string[] schname = { "山东大学", "山东财经大学", "山东科技大学", "山东理工大学", "中国海洋大学", "中国石油大学", "青岛大学","烟台大学","山东工商学院","德州学院" };
           string[] schstname = { "sdu", "sdufe", "sdus", "sdui", "cou", "upc", "qdu","ytdu","gsu","dzu" };
           string[] schcity = { "济南", "济南", "济南", "淄博", "青岛", "青岛", "青岛","烟台","烟台","德州" };

           for (int s = 0; s < SHCOOL_COUNT; s++)
           {
               //int isch = new Random().Next(schname.Length);
               //string ischName = schname[isch];
               //string ischCity = schcity[isch];
               //string ischstname = schstname[isch];
               School school = new School()
               {
                   CityName = schcity[s],
                   ShortName = schstname[s],
                   Name = schname[s],
                   Image = "image/121.jpg",
               };
               schoolList.Add(school);
           }
           List<School> schoolListClone = new List<School>(schoolList);

           for (int j = 0; j < 2 * SHOP_COUNT; j += 2)
           {

               int iisch = new Random().Next(schoolListClone.Count);
               School school = schoolListClone[iisch];

               for (int i = j; i < j + 2; i++)
               {
                   Shop shop = new ShopRepository().SearchByShortName("yinzuo" + i.ToString());
                   if (shop != null)
                   {
                       SchoolOfMerchant schoolShop = new SchoolOfMerchant()
                       {
                           Merchant = shop,
                           School = school
                       };

                       school.SchoolOfMerchants.Add(schoolShop);

                   }
               }
               for (int i = j; i < j + 2; i++)
               {
                   Shop shop = new ShopRepository().SearchByShortName("darunfa" + i.ToString());
                   if (shop != null)
                   {
                       SchoolOfMerchant schoolShop = new SchoolOfMerchant()
                       {

                           Merchant = shop,
                           School = school
                       };

                       school.SchoolOfMerchants.Add(schoolShop);

                   }
               }
               new SchoolRepository().SaveOrUpdate(school);
               schoolListClone.Remove(school);
           }



       }
       private void add_Shop_to_MyFavorite()
       {
           List<SystemUser> systemUserListClone = new List<SystemUser>(systemUserList);
           for (int i = 0; i < SYSTEM_USER_COUNT/2; i++)
           {
               int index = new Random().Next(systemUserListClone.Count());
               SystemUser systemUser = systemUserListClone.ElementAt(index);           
               int shopCountRnd = new Random().Next(MY_FAVAORITE_SHOP_COUNT) + 1;
               List<Shop> shopListClone = new List<Shop>(shopList);
               for (int j = 1; j <= shopCountRnd; j++)
               {
                   int shopCloneCount = shopListClone.Count;
                   int shopIndexRnd = new Random().Next(shopCloneCount);
                   Shop shop = shopListClone.ElementAt(shopIndexRnd);
                   add_MyFavorite(systemUser, shop);
                   shopListClone.Remove(shop);
               }
               systemUserListClone.Remove(systemUser);
           }
       }
       private void add_MyFavorite(SystemUser systemUser,Shop shop)
       {
           MyFavorite myFavorite = new MyFavorite()
           {
                Merchant = shop,
               SystemUser = systemUser
           };
           new  MyFavoriteRepository().SaveOrUpdate(myFavorite);
       }
       private void add_Random_Xiaoer_to_Shop()
       {
           Shop shop;
           for (int i = 0; i < SHOP_COUNT; i++)
           {
               shop = new ShopRepository().SearchByShortName("yinzuo"+i.ToString());
               int xiaoerCountRnd = new Random().Next(3) + 1;
               for (int j = 1; j <= xiaoerCountRnd; j++)
               {
                   add_LoginUser_Shop(shop, j);
               }
           }
           for (int i = 0; i < SHOP_COUNT; i++)
           {
               shop = new ShopRepository().SearchByShortName("darunfa" + i.ToString());
               int xiaoerCountRnd = new Random().Next(3) + 1;
               for (int j = 1; j <= xiaoerCountRnd; j++)
               {
                   add_LoginUser_Shop(shop, j);
               }
           }
       }
       private void add_LoginUser_Shop(Shop shop,int xiaoerIndex)
       {
           string xiaoerid = Guid.NewGuid().ToString();
           LoginUser LoginUser = new LoginUser(xiaoerid)
           {
               IsAdmin = false,
               LoginName = "xiaoer_"+shop.ShortName+"_"+xiaoerIndex,
               Password = "xiaoer",
               //UserType =UserTypeEnum.商店店小二,
           };



           LoginUserOfMerchant loginUserOfMerchant = new LoginUserOfMerchant()
           {
               LoginUser = LoginUser,
                Merchant = shop,
               EntityIndex = 1,
           };

           LoginUser.LoginUserOfMerchants.Add(loginUserOfMerchant);

           new LoginUserRepository().SaveOrUpdate(LoginUser);

       }
       private void add_Random_MyOrder()
       {
           for (int i = 0; i < ORDER_COUNT; i++)
           {
               int systemUserIndexRnd = new Random().Next(systemUserList.Count);
               var systemUser = systemUserList.ElementAt(systemUserIndexRnd);
               int shopIndexRnd = new Random().Next(shopList.Count);
               var shop = shopList.ElementAt(shopIndexRnd);
               add_MyOrder_OrderCommodity(systemUser, shop);
           }
       }
       private void add_MyOrder_OrderCommodity(SystemUser systemUser,Shop shop)
       {
           var address = systemUser.Addresses.FirstOrDefault();
           MyCommodityOrder myCommodityOrder = new MyCommodityOrder()
           {
               Address = address.AddressName,
               Linkman = address.Linkman,
               SystemUser = systemUser,
               EntityIndex = 1,
               Tel = address.Tel,
               Shop = shop,
               OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
               OrderStatus = MyOrderStatusEnum.成功,
               SendTime = "11:20",
               Description = "不要辣椒"
           };
           int commodityCountRnd = new Random().Next(FOOD_COUNT_OF_SHOP) + 1;
           var commodityListClone=new List<Commodity>(shop.Commodities);
           for (int i = 0; i < commodityCountRnd; i++)
           {
               int commodityIndexRnd = new Random().Next(commodityListClone.Count);
               var commodity = commodityListClone.ElementAt(commodityIndexRnd);
               OrderOfCommodity orderOfCommodity_1 = new OrderOfCommodity()
               {
                   Amount = 2,
                   MyCommodityOrder = myCommodityOrder,
                   Price = commodity.Price,
                   Commodity = commodity,
                   EntityIndex = 1
               };
               myCommodityOrder.OrderOfCommodities.Add(orderOfCommodity_1);


               commodityListClone.Remove(commodity);
           }         

           new MyCommodityOrderRepository().SaveOrUpdate(myCommodityOrder);
       }
       //private SystemUser get_random_SystemUser()
       //{
       //    return new SystemUser();
       //}
       //private LoginUser get_random_LoginUser()
       //{
       //    return new LoginUser();
       //}
       private String get_random_number_with_fixed_width(int width)
       {
           int x = new Random().Next(Convert.ToInt32(String.Empty.PadRight(width, '9')));
           return x.ToString().PadLeft(width, '0');

       }

    }
}
