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
    public class PopulateFakeRentDataTest
    {
       private List<SystemUser> systemUserList = new List<SystemUser>();
       private List<LoginUser> loginUserList = new List<LoginUser>();
       private List<Rent> rentList = new List<Rent>();
       private List<House> houseOfRent1List = new List<House>();
       private List<House> houseOfRent2List = new List<House>();
       private IList<MerchantCategory> merchantCategoryList = new List<MerchantCategory>();
       IMerchantCategoryRepository iMerchantCategoryRepository = UnityHelper.UnityToT<IMerchantCategoryRepository>();
       private readonly int SYSTEM_USER_COUNT = 500;
       private readonly int MY_FAVAORITE_RENT_COUNT = 5;
       private readonly int RENT_COUNT = 10;  //we double RENT_COUNT  eg  10*2
       private readonly int HOUSE_COUNT_OF_RENT = 10;
       private readonly int ORDER_COUNT = 500;
       //string[] mCategory = {"个人出租", "房屋中介"};

       [SetUp]
        public void init()
        {
            for (int i = 0; i < SYSTEM_USER_COUNT; i++)
            {
                add_SystemUser_Address_LoginUser();
            }

            //add_MerchantCategory();
                    
            for (int i = 0; i < RENT_COUNT; i++)
            {
                merchantCategoryList = iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.租房);
                if (merchantCategoryList.Count == 0)
                {
                    throw new Exception("You must run PopulateRealPermissionDataTest.cs  First");
                }
                int mCRnd = new Random().Next(merchantCategoryList.Count);//mCategory.Length
                //string mCategoryName = mCategory[mCRnd];
                MerchantCategory merchantCategory = merchantCategoryList[mCRnd];
                //merchantCategory = new MerchantCategoryRepository().SearchByMerchantCategoryName(mCategoryName);
                add_Rent_House_RentHouseType(i, merchantCategory);
            }
            add_School_Rent();
            add_Rent_to_MyFavorite();
            add_Random_Xiaoer_to_Rent();
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
       //            MerchantType = MerchantTypeEnum.租房
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

           RentCart rentCart = new RentCart()
           {
               SystemUser = systemUser_1
           };
           systemUser_1.RentCarts.Add(rentCart);
           systemUser_1.Addresses.Add(address);

           //new SystemUserRepository().SaveOrUpdate(systemUser_1);
           //2013-02-04 lampard it can save rentCart
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
       private void add_Rent_House_RentHouseType(int index, MerchantCategory merchantCategory)
       {      

           string houseid1;
           string houseid2;
           //2013-2-4 lampard 
           //we should save RentHouseType before we give it to the house
           Rent rent = new Rent()
           {
               Activity = "9折",
               Address = "山东财经大学",
               Bulletins = "房源紧张！",
               Description = "just come",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "安泰房屋中介"+index.ToString(),
               Owener = "haha",
               ShortName = "antai"+index.ToString(),
               Tel = "18799999992",
               Rate = 0.8,
               ShopStatus = ShopStatusEnum.接受预定,
               MerchantCategory = merchantCategory
              
           };

          
           MerchantGoodsType rentHouseTye_1 = new MerchantGoodsType() {  Merchant = rent, GoodsType = "学区房" };
           MerchantGoodsType rentHouseTye_2 = new MerchantGoodsType() {  Merchant = rent, GoodsType = "海景房" };
           rent.MerchantGoodsTypes.Add(rentHouseTye_1);
           rent.MerchantGoodsTypes.Add(rentHouseTye_2);

           new RentRepository().SaveOrUpdate(rent);

           //创建Merchant的管理员用户
           IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
           ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

           LoginUser lu1 = new LoginUser();
           lu1.LoginName = "Login" + rent.Name;
           lu1.Password = "LPass" + rent.Tel;
           //lu1.UserType = UserTypeEnum.租房;
           iLoginUserRepository.SaveOrUpdate(lu1);

           LoginUserOfMerchant lum = new LoginUserOfMerchant();
           lum.Merchant = rent;
           lum.LoginUser = lu1;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum);


           for (int i = 0; i < HOUSE_COUNT_OF_RENT; i++)
           {
               houseid1 = Guid.NewGuid().ToString();
               House house_1 = new House(houseid1) 
               {
                   Name = "燕山盛世"+i.ToString(),
                   Price = 10,
                   Image = "image/1212/img",
                   IsDiscount = false,
                   InventoryCount = 100,
                   MerchantGoodsType = rentHouseTye_1,
                   Rent = rent,
                   TimeOfRentFrom=Convert.ToDateTime("2007-8-1"),
                   TimeOfRentTO = Convert.ToDateTime("2008-8-1"),   
                   DaySpanOfRent=12

               };
               rent.Houses.Add(house_1);
               houseOfRent1List.Add(house_1);
           }

           for (int i = 0; i < HOUSE_COUNT_OF_RENT; i++)
           {
               houseid2 = Guid.NewGuid().ToString();
               House house_2 = new House(houseid2)
               {
                   Name = "港澳花园" + i.ToString(),
                   Price = 15,
                   Image = "image/121.png",
                   IsDiscount = true,
                   InventoryCount = 200,
                   DiscountInventoryCount = 100,
                   MerchantGoodsType = rentHouseTye_2,
                   DiscountPrice = 10,
                   Rent = rent,
                   IsLimited = true,
                   TimeOfRentFrom = Convert.ToDateTime("2007-10-1"),
                   TimeOfRentTO = Convert.ToDateTime("2008-4-1"),
                   DaySpanOfRent = 6

               };
               rent.Houses.Add(house_2);
               houseOfRent1List.Add(house_2);
           }


           new RentRepository().SaveOrUpdate(rent);
           rentList.Add(rent);

           

           rent = new Rent()
           {
               Activity = "8折",
               Address = "山东财经大学燕山",    
               Bulletins = "房源紧张",
               Description = "房源紧张",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = "润华置业" + index.ToString(),
               Owener = "baobao",
               ShortName = "runhua" + index.ToString(),
               Tel = "18799999992",          
               Rate = 0.8,
               ShopStatus = ShopStatusEnum.接受预定,
               MerchantCategory = merchantCategory
              
              
           };

           rentHouseTye_1 = new MerchantGoodsType() { Merchant = rent,  GoodsType = "商品房" };
           rentHouseTye_2 = new MerchantGoodsType() {  Merchant = rent,  GoodsType = "小产权房" };
           rent.MerchantGoodsTypes.Add(rentHouseTye_1);
           rent.MerchantGoodsTypes.Add(rentHouseTye_2);

           new RentRepository().SaveOrUpdate(rent);

           LoginUser lu2 = new LoginUser();
           lu2.LoginName = "Login" + rent.Name;
           lu2.Password = "LPass" + rent.Tel;
           //lu2.UserType = UserTypeEnum.租房;
           iLoginUserRepository.SaveOrUpdate(lu2);

           LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
           lum2.Merchant = rent;
           lum2.LoginUser = lu1;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);

           for (int i = 0; i < HOUSE_COUNT_OF_RENT; i++)
           {
               houseid1 = Guid.NewGuid().ToString();
               House house_1 = new House(houseid1)
               {
                   Name = "燕山小区" + i.ToString(),
                   Price = 10,
                   Image = "image/1212/img",
                   IsDiscount = false,
                   InventoryCount = 100,
                   MerchantGoodsType = rentHouseTye_1,
                   Rent = rent,
                   TimeOfRentFrom = Convert.ToDateTime("2007-1-1"),
                   TimeOfRentTO = Convert.ToDateTime("2008-1-1"),
                   DaySpanOfRent = 12

               };
               rent.Houses.Add(house_1);
               houseOfRent2List.Add(house_1);
           }

           for (int i = 0; i < HOUSE_COUNT_OF_RENT; i++)
           {
               houseid2 = Guid.NewGuid().ToString();
               House house_2 = new House(houseid2)
               {
                   Name = "甸柳新村" + i.ToString(),
                   Price = 15,
                   Image = "image/121.png",
                   IsDiscount = true,
                   InventoryCount = 200,
                   DiscountInventoryCount = 100,
                   MerchantGoodsType = rentHouseTye_2,
                   DiscountPrice = 10,
                   Rent = rent,
                   IsLimited = true,
                   TimeOfRentFrom = Convert.ToDateTime("2007-5-1"),
                   TimeOfRentTO = Convert.ToDateTime("2008-10-1"),
                   DaySpanOfRent = 5

               };
               rent.Houses.Add(house_2);
               houseOfRent2List.Add(house_2);
           }


           new RentRepository().SaveOrUpdate(rent);
           rentList.Add(rent);
       }
       private void add_School_Rent()
       {
           School school = new School()
           {
               CityName = "济南",
               ShortName = "sdufe.yanshan",
               Name = "山东财经大学燕山校区",
               Image = "image/121.jpg",
           };
           for (int i = 0; i < RENT_COUNT; i++)
           {
               Rent rent = new RentRepository().SearchByShortName("antai"+i.ToString());
               if (rent != null)
               {
                   SchoolOfMerchant schoolRent = new SchoolOfMerchant()
                   {
                       Merchant = rent,
                       School = school
                   };

                   school.SchoolOfMerchants.Add(schoolRent);

               }
           }
           for (int i = 0; i < RENT_COUNT; i++)
           {
               Rent rent = new RentRepository().SearchByShortName("runhua" + i.ToString());
               if (rent != null)
               {
                   SchoolOfMerchant schoolRent = new SchoolOfMerchant()
                   {
                        
                        Merchant = rent,
                       School = school
                   };

                   school.SchoolOfMerchants.Add(schoolRent);

               }
           }
           new SchoolRepository().SaveOrUpdate(school);
       }
       private void add_Rent_to_MyFavorite()
       {
           List<SystemUser> systemUserListClone = new List<SystemUser>(systemUserList);
           for (int i = 0; i < SYSTEM_USER_COUNT/2; i++)
           {
               int index = new Random().Next(systemUserListClone.Count());
               SystemUser systemUser = systemUserListClone.ElementAt(index);           
               int rentCountRnd = new Random().Next(MY_FAVAORITE_RENT_COUNT) + 1;
               List<Rent> rentListClone = new List<Rent>(rentList);
               for (int j = 1; j <= rentCountRnd; j++)
               {
                   int rentCloneCount = rentListClone.Count;
                   int rentIndexRnd = new Random().Next(rentCloneCount);
                   Rent rent = rentListClone.ElementAt(rentIndexRnd);
                   add_MyFavorite(systemUser, rent);
                   rentListClone.Remove(rent);
               }
               systemUserListClone.Remove(systemUser);
           }
       }
       private void add_MyFavorite(SystemUser systemUser,Rent rent)
       {
           MyFavorite myFavorite = new MyFavorite()
           {
                Merchant = rent,
               SystemUser = systemUser
           };
           new  MyFavoriteRepository().SaveOrUpdate(myFavorite);
       }
       private void add_Random_Xiaoer_to_Rent()
       {
           Rent rent;
           for (int i = 0; i < RENT_COUNT; i++)
           {
               rent = new RentRepository().SearchByShortName("antai"+i.ToString());
               int xiaoerCountRnd = new Random().Next(3) + 1;
               for (int j = 1; j <= xiaoerCountRnd; j++)
               {
                   add_LoginUser_Rent(rent, j);
               }
           }
           for (int i = 0; i < RENT_COUNT; i++)
           {
               rent = new RentRepository().SearchByShortName("runhua" + i.ToString());
               int xiaoerCountRnd = new Random().Next(3) + 1;
               for (int j = 1; j <= xiaoerCountRnd; j++)
               {
                   add_LoginUser_Rent(rent, j);
               }
           }
       }
       private void add_LoginUser_Rent(Rent rent,int xiaoerIndex)
       {
           string xiaoerid = Guid.NewGuid().ToString();
           LoginUser LoginUser = new LoginUser(xiaoerid)
           {
               IsAdmin = false,
               LoginName = "xiaoer_"+rent.ShortName+"_"+xiaoerIndex,
               Password = "xiaoer",
               //UserType =UserTypeEnum.租房店小二,
           };



           LoginUserOfMerchant loginUserOfMerchant = new LoginUserOfMerchant()
           {
               LoginUser = LoginUser,
                Merchant = rent,
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
               int rentIndexRnd = new Random().Next(rentList.Count);
               var rent = rentList.ElementAt(rentIndexRnd);
               add_MyOrder_OrderHouse(systemUser, rent);
           }
       }
       private void add_MyOrder_OrderHouse(SystemUser systemUser,Rent rent)
       {
           var address = systemUser.Addresses.FirstOrDefault();
           MyHouseOrder myHouseOrder = new MyHouseOrder()
           {
               Address = address.AddressName,
               Linkman = address.Linkman,
               SystemUser = systemUser,
               EntityIndex = 1,
               Tel = address.Tel,
               Rent = rent,
               OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  //2013-02-10 TODO basilwang need use id policy
               OrderStatus = MyOrderStatusEnum.成功,
               SendTime = "11:20",
               Description = "要求是学区房"
           };
           int houseCountRnd = new Random().Next(HOUSE_COUNT_OF_RENT) + 1;
           var houseListClone=new List<House>(rent.Houses);
           for (int i = 0; i < houseCountRnd; i++)
           {
               int houseIndexRnd = new Random().Next(houseListClone.Count);
               var house = houseListClone.ElementAt(houseIndexRnd);
               OrderOfHouse orderOfHouse_1 = new OrderOfHouse()
               {
                   Amount = 2,
                   MyHouseOrder = myHouseOrder,
                   Price = house.Price,
                   House = house,
                   EntityIndex = 1
               };
               myHouseOrder.OrderOfHouses.Add(orderOfHouse_1);


               houseListClone.Remove(house);
           }         

           new MyHouseOrderRepository().SaveOrUpdate(myHouseOrder);
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
