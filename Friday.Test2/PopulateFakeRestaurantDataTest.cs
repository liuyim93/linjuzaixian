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
    public class PopulateFakeRestaurantDataTest
    {
       private List<SystemUser> systemUserList = new List<SystemUser>();
       private List<LoginUser> loginUserList = new List<LoginUser>();
       private List<Restaurant> restaurantList = new List<Restaurant>();
       private List<Address> addressList = new List<Address>();
       private List<Food> foodOfRestaurant1List = new List<Food>();
       private List<Food> foodOfRestaurant2List = new List<Food>();
       private List<School> schoolList = new List<School>();
       private readonly int SYSTEM_USER_COUNT = 500;
       private readonly int MY_FAVAORITE_RESTAURANT_COUNT = 5;
       private readonly int RESTAURANT_COUNT = 15;  //we double RESTAURANT_COUNT  eg  10*2
       private readonly int FOOD_COUNT_OF_RESTAURANT = 10;
       private readonly int ORDER_COUNT = 500;
       private readonly int SHCOOL_COUNT = 10;
       string[] mCategory = { "中餐", "西餐", "清真"};
       string[] schname = { "山东轻工业学院", "山东农业大学", "山东工业大学", "山东师范大学", "潍坊学院", "聊城大学", "青岛科技大学", "青岛理工大学", "哈尔滨工业大学威海校区", "菏泽学院" };
       string[] schstname = { "sduq", "sdua", "sdug", "sdut", "wfu", "lcu", "qdkju", "qdlgu", "hgu", "hzu" };
       string[] schcity = { "济南", "泰安", "济南", "济南", "潍坊", "聊城", "青岛", "青岛", "威海", "菏泽" };


       [SetUp]
        public void init()
        {
            for (int i = 0; i < SYSTEM_USER_COUNT; i++)
            {
                add_SystemUser_Address_LoginUser();
            }

            add_MerchantCategory();
                    
            for (int i = 0; i < RESTAURANT_COUNT; i++)
            {
                int mCRnd = new Random().Next(3);//mCategory.Length
                string mCategoryName = mCategory[mCRnd];
                MerchantCategory merchantCategory;
                merchantCategory = new MerchantCategoryRepository().SearchByMerchantCategoryName(mCategoryName);
                add_Restaurant_Food_RestaurantFoodType(i, merchantCategory);
            }
            add_School_Restaurant();
            add_Restaurant_to_MyFavorite();
            add_Random_Xiaoer_to_Restaurant();
            add_Random_MyOrder();
        }
       //2013-02-17  pangfuxing  add MerchantCategory
       private void add_MerchantCategory() 
       {
           for (int i = 0; i < mCategory.Length; i++)
           {
               string merchantcategoryid = Guid.NewGuid().ToString();
               MerchantCategory merchantCategory = new MerchantCategory(merchantcategoryid)
               {
                   MerchantCategoryName = mCategory[i],
                   MerchantType = MerchantTypeEnum.餐馆
               };
               new MerchantCategoryRepository().SaveOrUpdate(merchantCategory);
           }
                 
       }

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
                   Email = "john" + tel + "@163.com",
                   Tel = tel,
                   Name = "john" + tel,
                   //UserType=0,
                   Description = "我NO是测试账户",

               };
               for (int i = 0; i < schname.Length;i++ )
               {         
                  Address address = new Address()
                {
               AddressName = schname[i] + get_random_number_with_fixed_width(2) + "号宿舍楼" + get_random_number_with_fixed_width(3),
               BackupTel = "187" + get_random_number_with_fixed_width(8),
               Email = "john" + tel + "@163.com",
               Linkman = "john" + tel,
               QQ = get_random_number_with_fixed_width(8),
               Tel = tel,
               Weixin = get_random_number_with_fixed_width(7),
               //SystemUser = systemUser_1
                 };
                  addressList.Add(address);
               }

               int iAddSysRan = new Random().Next(schname.Length)+1;//mCategory.Length
               List<Address> addressListClone = new List<Address>(addressList);

               for (int i = 0; i < iAddSysRan;i++ )
               {
                   int rAddSysRan = new Random().Next(addressListClone.Count);
                   addressListClone[rAddSysRan].SystemUser = systemUser_1;
                   systemUser_1.Addresses.Add(addressListClone[rAddSysRan]);
                   addressListClone.Remove(addressListClone[rAddSysRan]);
               }

           RestaurantCart restaurantCart = new RestaurantCart()
           {
               SystemUser = systemUser_1
           };
           systemUser_1.RestaurantCarts.Add(restaurantCart);
       

           //new SystemUserRepository().SaveOrUpdate(systemUser_1);
           //2013-02-04 lampard it can save restaurantCart
           LoginUser loginUser = new LoginUser(loginuserid)
           {
               SystemUser = systemUser_1,
               IsAdmin = false,
               LoginName = "john" + tel,
               Password = "john",
               UserType = UserTypeEnum.会员用户
           };
           systemUser_1.LoginUser = loginUser;
           new LoginUserRepository().SaveOrUpdate(loginUser);

           systemUserList.Add(systemUser_1);
           loginUserList.Add(loginUser);

       }
       private void add_Restaurant_Food_RestaurantFoodType(int index, MerchantCategory merchantCategory)
       {      

           string foodid1;
           string foodid2;
           //2013-2-4 lampard 
           //we should save RestaurantFoodType before we give it to the food
           Restaurant restaurant1 = new Restaurant()
           {
               Activity = "jiuzhe",
               Address = "山东财经大学燕山",
               AfternoonBeginHour = "18:20",
               AfternoonEndHour = "19:30",
               Bulletins = "不难吃",
               Cost = 2,
               Description = "just come",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "乐而美"+index.ToString(),
               Owener = "haha",
               ShortName = "leermei"+index.ToString(),
               Tel = "18799999992",
               SendTime = 30,
               Rate = 0.8,
               SendPrice = 10,
               ShopStatus = ShopStatusEnum.营业时间,
               MerchantCategory = merchantCategory,   
            
                
              
           };
          

                 

           //2012-02-16 pangfuxing  RestaurantFoodType->MerchantGoodsType
           MerchantGoodsType restaurantFoodTye_1 = new MerchantGoodsType() {  Merchant = restaurant1, GoodsType = "汉堡" };
           MerchantGoodsType restaurantFoodTye_2 = new MerchantGoodsType() {  Merchant = restaurant1, GoodsType = "小吃" };
           restaurant1.MerchantGoodsTypes.Add(restaurantFoodTye_1);
           restaurant1.MerchantGoodsTypes.Add(restaurantFoodTye_2);

           new RestaurantRepository().SaveOrUpdate(restaurant1);
           //创建Merchant的管理员用户
           IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
           ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

           LoginUser lu1 = new LoginUser();
           lu1.LoginName = "LgnLe" + restaurant1.Name;
           lu1.Password = "LPass" + restaurant1.Tel;
           lu1.UserType = UserTypeEnum.餐馆;
           iLoginUserRepository.SaveOrUpdate(lu1);

           LoginUserOfMerchant lum = new LoginUserOfMerchant();
           lum.Merchant = restaurant1;
           lum.LoginUser = lu1;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum);


           for (int i = 0; i < FOOD_COUNT_OF_RESTAURANT; i++)
           {
               foodid1 = Guid.NewGuid().ToString();
               Food food_1 = new Food(foodid1)
               {
                   Name = "鸡腿堡"+i.ToString(),
                   Price = 10,
                   Image = "image/1212/img",
                   IsDiscount = false,
                   InventoryCount = 100,
                   MerchantGoodsType = restaurantFoodTye_1,
                   Restaurant = restaurant1,

               };
               restaurant1.Foods.Add(food_1);
               foodOfRestaurant1List.Add(food_1);
           }

           for (int i = 0; i < FOOD_COUNT_OF_RESTAURANT; i++)
           {
               foodid2 = Guid.NewGuid().ToString();
               Food food_2 = new Food(foodid2)
               {
                   Name = "薯条" + i.ToString(),
                   Price = 15,
                   Image = "image/121.png",
                   IsDiscount = true,
                   InventoryCount = 200,
                   DiscountInventoryCount = 100,
                   MerchantGoodsType = restaurantFoodTye_2,
                   DiscountPrice = 10,
                   Restaurant = restaurant1,
                   IsLimited = true,

               };
               restaurant1.Foods.Add(food_2);
               foodOfRestaurant1List.Add(food_2);
           }


           new RestaurantRepository().SaveOrUpdate(restaurant1);
           restaurantList.Add(restaurant1);

           Restaurant restaurant2 = new Restaurant()
           {
               Activity = "jiuzhe",
               Address = "山东财经大学燕山",
               AfternoonBeginHour = "18:20",
               AfternoonEndHour = "19:30",
               Bulletins = "不难吃",
               Cost = 2,
               Description = "煲饭堂",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "煲饭堂" + index.ToString(),
               Owener = "baobao",
               ShortName = "baofantang" + index.ToString(),
               Tel = "18799999992",
               SendTime = 30,
               Rate = 0.8,
               SendPrice = 10,
               ShopStatus = ShopStatusEnum.正在休息,
               MerchantCategory = merchantCategory
              
              
           };

           restaurantFoodTye_1 = new MerchantGoodsType() { Merchant = restaurant2,  GoodsType = "米饭" };
           restaurantFoodTye_2 = new MerchantGoodsType() {  Merchant = restaurant2,  GoodsType = "面食" };
           restaurant2.MerchantGoodsTypes.Add(restaurantFoodTye_1);
           restaurant2.MerchantGoodsTypes.Add(restaurantFoodTye_2);

           new RestaurantRepository().SaveOrUpdate(restaurant2);

           LoginUser lu2 = new LoginUser();
           lu2.LoginName = "Lgnbao" + restaurant2.Name;
           lu2.Password = "LPass" + restaurant2.Tel;
           lu2.UserType = UserTypeEnum.餐馆;
           iLoginUserRepository.SaveOrUpdate(lu2);

           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = restaurant2;
           lum2.LoginUser = lu2;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

           for (int i = 0; i < FOOD_COUNT_OF_RESTAURANT; i++)
           {
               foodid1 = Guid.NewGuid().ToString();
               Food food_1 = new Food(foodid1)
               {
                   Name = "鸡腿饭" + i.ToString(),
                   Price = 10,
                   Image = "image/1212/img",
                   IsDiscount = false,
                   InventoryCount = 100,
                   MerchantGoodsType = restaurantFoodTye_1,
                   Restaurant = restaurant2,

               };
               restaurant2.Foods.Add(food_1);
               foodOfRestaurant2List.Add(food_1);
           }

           for (int i = 0; i < FOOD_COUNT_OF_RESTAURANT; i++)
           {
               foodid2 = Guid.NewGuid().ToString();
               Food food_2 = new Food(foodid2)
               {
                   Name = "烙饼" + i.ToString(),
                   Price = 15,
                   Image = "image/121.png",
                   IsDiscount = true,
                   InventoryCount = 200,
                   DiscountInventoryCount = 100,
                   MerchantGoodsType = restaurantFoodTye_2,
                   DiscountPrice = 10,
                   Restaurant = restaurant2,
                   IsLimited = true,

               };
               restaurant2.Foods.Add(food_2);
               foodOfRestaurant2List.Add(food_2);
           }


           new RestaurantRepository().SaveOrUpdate(restaurant2);
           restaurantList.Add(restaurant2);
       }
       private void add_School_Restaurant()
       {

         
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


           for (int j = 0; j < 20; j += 2)
           {

               int iisch = new Random().Next(schoolListClone.Count);
               School school = schoolListClone[iisch];

               for (int i = j; i < j + 2; i++)
               {
                   Restaurant restaurant = new RestaurantRepository().SearchByShortName("leermei" + i.ToString());
                   if (restaurant != null)
                   {
                       SchoolOfMerchant schoolRestaurant = new SchoolOfMerchant()
                       {
                           Merchant = restaurant,
                           School = school
                       };

                       school.SchoolOfMerchants.Add(schoolRestaurant);

                   }
               }
               for (int i = j; i < j + 2; i++)
               {
                   Restaurant restaurant = new RestaurantRepository().SearchByShortName("baofantang" + i.ToString());
                   if (restaurant != null)
                   {
                       SchoolOfMerchant schoolRestaurant = new SchoolOfMerchant()
                       {

                           Merchant = restaurant,
                           School = school
                       };

                       school.SchoolOfMerchants.Add(schoolRestaurant);

                   }
               }
               new SchoolRepository().SaveOrUpdate(school);
               schoolListClone.Remove(school);
           }
       }
       private void add_Restaurant_to_MyFavorite()
       {
           List<SystemUser> systemUserListClone = new List<SystemUser>(systemUserList);
           for (int i = 0; i < SYSTEM_USER_COUNT/2; i++)
           {
               int index = new Random().Next(systemUserListClone.Count());
               SystemUser systemUser = systemUserListClone.ElementAt(index);           
               int restaurantCountRnd = new Random().Next(MY_FAVAORITE_RESTAURANT_COUNT) + 1;
               List<Restaurant> restaurantListClone = new List<Restaurant>(restaurantList);
               for (int j = 1; j <= restaurantCountRnd; j++)
               {
                   int restaurantCloneCount = restaurantListClone.Count;
                   int restaurantIndexRnd = new Random().Next(restaurantCloneCount);
                   Restaurant restaurant = restaurantListClone.ElementAt(restaurantIndexRnd);
                   add_MyFavorite(systemUser, restaurant);
                   restaurantListClone.Remove(restaurant);
               }
               systemUserListClone.Remove(systemUser);
           }
       }
       private void add_MyFavorite(SystemUser systemUser,Restaurant restaurant)
       {
           MyFavorite myFavorite = new MyFavorite()
           {
                Merchant = restaurant,
               SystemUser = systemUser
           };
           new  MyFavoriteRepository().SaveOrUpdate(myFavorite);
       }
       private void add_Random_Xiaoer_to_Restaurant()
       {
           Restaurant restaurant;
           for (int i = 0; i < RESTAURANT_COUNT; i++)
           {
               restaurant = new RestaurantRepository().SearchByShortName("leermei"+i.ToString());
               int xiaoerCountRnd = new Random().Next(3) + 1;
               for (int j = 1; j <= xiaoerCountRnd; j++)
               {
                   add_LoginUser_Restaurant(restaurant, j);
               }
           }
           for (int i = 0; i < RESTAURANT_COUNT; i++)
           {
               restaurant = new RestaurantRepository().SearchByShortName("baofantang" + i.ToString());
               int xiaoerCountRnd = new Random().Next(3) + 1;
               for (int j = 1; j <= xiaoerCountRnd; j++)
               {
                   add_LoginUser_Restaurant(restaurant, j);
               }
           }
       }
       private void add_LoginUser_Restaurant(Restaurant restaurant,int xiaoerIndex)
       {
           string xiaoerid = Guid.NewGuid().ToString();
           LoginUser LoginUser = new LoginUser(xiaoerid)
           {
               IsAdmin = false,
               LoginName = "xiaoer_"+restaurant.ShortName+"_"+xiaoerIndex,
               Password = "xiaoer",
               UserType =UserTypeEnum.餐馆店小二,
           };



           LoginUserOfMerchant loginUserOfMerchant = new LoginUserOfMerchant()
           {
               LoginUser = LoginUser,
                Merchant = restaurant,
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
               int restaurantIndexRnd = new Random().Next(restaurantList.Count);
               var restaurant = restaurantList.ElementAt(restaurantIndexRnd);
               add_MyOrder_OrderFood(systemUser, restaurant);
           }
       }
       private void add_MyOrder_OrderFood(SystemUser systemUser,Restaurant restaurant)
       {
           var address = systemUser.Addresses.FirstOrDefault();
           MyFoodOrder myFoodOrder = new MyFoodOrder()
           {
               Address = address.AddressName,
               Linkman = address.Linkman,
               SystemUser = systemUser,
               EntityIndex = 1,
               Tel = address.Tel,
               Restaurant = restaurant,
               OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
               OrderStatus = MyOrderStatusEnum.成功,
               SendTime = "11:20",
               Description = "不要辣椒"
           };
           int foodCountRnd = new Random().Next(FOOD_COUNT_OF_RESTAURANT) + 1;
           var foodListClone=new List<Food>(restaurant.Foods);
           for (int i = 0; i < foodCountRnd; i++)
           {
               int foodIndexRnd = new Random().Next(foodListClone.Count);
               var food = foodListClone.ElementAt(foodIndexRnd);
               OrderOfFood orderOfFood_1 = new OrderOfFood()
               {
                   Amount = 2,
                   MyFoodOrder = myFoodOrder,
                   Price = food.Price,
                   Food = food,
                   EntityIndex = 1
               };
               myFoodOrder.OrderOfFoods.Add(orderOfFood_1);


               foodListClone.Remove(food);
           }         

           new MyFoodOrderRepository().SaveOrUpdate(myFoodOrder);
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
