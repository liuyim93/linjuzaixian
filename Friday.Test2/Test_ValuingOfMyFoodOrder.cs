using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.EnumType;
using friday.core.components;
using System.Linq;
using System.Transactions;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_ValuingOfMyFoodOrder
    {
        //private TransactionScope scope;
        //[SetUp]
        //public void SetUp()
        //{
        //    scope = new TransactionScope();
        //}

        //[TearDown]
        //public void TearDown()
        //{
        //    scope.Dispose();
        //}
        [Test]
        public void Test()
        {
            string shopName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string shopName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            IRestaurantRepository iRestaurantRepository = UnityHelper.UnityToT<IRestaurantRepository>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
            ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();

            IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

            IRepository<MyFoodOrder> iMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<MyFoodOrder>>();

            IRepository<ValuingOfMyFoodOrder> iValuingOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyFoodOrder>>();
            IRepository<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyFoodOrder>>();
            IRepository<ScoreOfItemInFoodOrder> iScoreOfItemInFoodOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInFoodOrder>>();

            IList<Restaurant> iRestaurants = new List<Restaurant>();
            IList<MyFoodOrder> iMyFoodOrders = new List<MyFoodOrder>();
            IList<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderOrders = new List<ValuingItemOfMyFoodOrder>();
            
            Restaurant rest1 = new Restaurant()
            {
               Activity = "9折促销",
               Address = "山东财经大学燕山",
               AfternoonBeginHour = "18:20",
               AfternoonEndHour = "19:30",
               Bulletins = "元宵节大促销",
               Cost = 2,
               Description = "本店元宵节大促销!!!!",
               Distance = "100",
               Email = "222@qq.com",
               Logo = "image/21222.jpg",
               Name = shopName,
               Owener = loginName,
               ShortName = "tianwaicun",
               Tel = "18799999992",
               SendTime = 30,
               Rate = 0.8,
               SendPrice = 10,             

            };
            iRestaurantRepository.SaveOrUpdate(rest1);

           LoginUser lu1 = new LoginUser();
           lu1.LoginName = loginName;
           lu1.Password = loginName;
           iLoginUserRepository.SaveOrUpdate(lu1);


           LoginUserOfMerchant lum = new LoginUserOfMerchant();
           lum.Merchant = rest1;
           lum.LoginUser = lu1;
           iLoginUserOfMerchantRepository.SaveOrUpdate(lum);


           SystemUser sysuser1 = new SystemUser()
           {
                Name="刘德华",
                Tel = "13966666666",
                Description = "现居香港",
                Email = "ocam30@163.com",
                EntityIndex = 30,
                IsAnonymous = false                 
           };
           LoginUser lgu1 = new LoginUser()
           {
               LoginName = loginName,
               Password = "book001",
               IsAdmin = false,
               SystemUser = sysuser1
           };

           sysuser1.LoginUser = lgu1;
           iLoginUserRepository.SaveOrUpdate(lgu1);


           for (int i = 0; i<3;i++ )
           {
               MyFoodOrder mfdorder = new MyFoodOrder()
               {
                   Linkman ="刘德华",
                   SystemUser = sysuser1,
                   EntityIndex = 1,
                   Tel ="111111111110",
                   Restaurant = rest1,
                   OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),  
                   OrderStatus = MyOrderStatusEnum.成功,
                   SendTime = "11:20",
                   Description = "不要辣椒"                    
               };
               iMyFoodOrderRepository.SaveOrUpdate(mfdorder);
               iMyFoodOrders.Add(mfdorder);
           };

           string[] vItemArray = {"送货速度","服务态度","商品质量"};
           foreach (var i in vItemArray) 
           {
               ValuingItemOfMyFoodOrder vluItemOfFd = new ValuingItemOfMyFoodOrder()
               {
                   ValuingItemName = i
               }; 
               //iValuingItemOfMyFoodOrderRepository.SaveOrUpdate(vluItemOfFd);
               iValuingItemOfMyFoodOrderOrders.Add(vluItemOfFd);
           };

           for (int i = 0; i < 3; i++) 
           {
               ValuingOfMyFoodOrder vluOfFd = new ValuingOfMyFoodOrder()
               {
                   LoginUser = lgu1,
                   Merchant = rest1,
                   MyFoodOrder = iMyFoodOrders[i],
                   ValuingContent=i+"送货速度慢，产品质量差，服务态度恶劣",                 
 
               };
               for (int j = 0; j < 3; j++) 
               {
                   ScoreOfItemInFoodOrder scoreOfItFd = new ScoreOfItemInFoodOrder()
                   {
                         Score=j,
                         ValuingOfMyFoodOrder=vluOfFd,
                         ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderOrders[j],                       
                   };
                   vluOfFd.ScoreOfItemInFoodOrders.Add(scoreOfItFd);
                   iValuingItemOfMyFoodOrderOrders[j].ScoreOfItemInFoodOrders.Add(scoreOfItFd);
                   iValuingItemOfMyFoodOrderRepository.SaveOrUpdate(iValuingItemOfMyFoodOrderOrders[j]);
                   //iScoreOfItemInFoodOrderRepository.SaveOrUpdate(scoreOfItFd);
               };
               iValuingOfMyFoodOrderRepository.SaveOrUpdate(vluOfFd);
           };

        }

     
    }
}
