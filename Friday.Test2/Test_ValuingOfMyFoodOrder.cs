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
        private TransactionScope scope;
        [SetUp]
        public void SetUp()
        {
            scope = new TransactionScope();
        }

        [TearDown]
        public void TearDown()
        {
            scope.Dispose();
        }
        [Test]
        public void Test_ValuingOfMyFoodOrder()
        {

            IRestaurantRepository iRestaurantRepository = UnityHelper.UnityToT<IRestaurantRepository>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
            ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();

            IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

            IRepository<MyFoodOrder> iMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<MyFoodOrder>>();

            IValuingOfMyFoodOrderRepository iValuingOfMyFoodOrderRepository = UnityHelper.UnityToT<IValuingOfMyFoodOrderRepository>();
            IRepository<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyFoodOrder>>();
            IRepository<ScoreOfItemInFoodOrder> iScoreOfItemInFoodOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInFoodOrder>>();

            IList<Restaurant> iRestaurants = new List<Restaurant>();
            IList<MyFoodOrder> iMyFoodOrders = new List<MyFoodOrder>();
            IList<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderOrders = new List<ValuingItemOfMyFoodOrder>();

            string rstName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string rstName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string ownerName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string ownerName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            string sysName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysLoginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysLoginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            Restaurant rest1 = new Restaurant()
            {
                Name = rstName,
                Owener = ownerName,
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

            Restaurant rest2 = new Restaurant()
            {
                Name = rstName2,
                Owener = ownerName2,
            };
            iRestaurantRepository.SaveOrUpdate(rest2);

            LoginUser lu2 = new LoginUser();
            lu2.LoginName = loginName2;
            lu2.Password = loginName2;
            iLoginUserRepository.SaveOrUpdate(lu2);

            LoginUserOfMerchant lum2 = new LoginUserOfMerchant();
            lum2.Merchant = rest2;
            lum2.LoginUser = lu2;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum2);


            SystemUser sysuser1 = new SystemUser()
            {
                Name = sysName,
                IsAnonymous = false
            };
            LoginUser lgu1 = new LoginUser()
            {
                LoginName = sysLoginName,
                IsAdmin = false,
                SystemUser = sysuser1
            };

            sysuser1.LoginUser = lgu1;
            iLoginUserRepository.SaveOrUpdate(lgu1);


            SystemUser sysuser2 = new SystemUser()
            {
                Name = sysName2,
                IsAnonymous = false
            };
            LoginUser lgu2 = new LoginUser()
            {
                LoginName = sysLoginName2,
                IsAdmin = false,
                SystemUser = sysuser2
            };
            sysuser2.LoginUser = lgu2;
            iLoginUserRepository.SaveOrUpdate(lgu2);

            for (int i = 0; i < 3; i++)
            {
                MyFoodOrder mfdorder = new MyFoodOrder()
                {
                    Linkman = sysuser1.Name,
                    SystemUser = sysuser1,
                    Restaurant = rest1,
                    EntityIndex = 1,
                    Tel = "111111111110",
                    OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),
                    OrderStatus = MyOrderStatusEnum.成功,
                    SendTime = "11:20",
                    Description = "不要辣椒"
                };
                iMyFoodOrderRepository.SaveOrUpdate(mfdorder);
                iMyFoodOrders.Add(mfdorder);

                MyFoodOrder mfdorder2 = new MyFoodOrder()
                {
                    Linkman = sysuser2.Name,
                    SystemUser = sysuser2,
                    Restaurant = rest2,
                    EntityIndex = 1,
                    Tel = "111111111110",
                    OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),
                    OrderStatus = MyOrderStatusEnum.成功,
                    SendTime = "11:20",
                    Description = "不要辣椒"
                };
                iMyFoodOrderRepository.SaveOrUpdate(mfdorder2);
                iMyFoodOrders.Add(mfdorder2);
            };

            string[] vItemArray = { "送货速度", "服务态度", "商品质量" };
            foreach (var i in vItemArray)
            {
                ValuingItemOfMyFoodOrder vluItemOfFd = new ValuingItemOfMyFoodOrder()
                {
                    ValuingItemName = i
                };
                iValuingItemOfMyFoodOrderRepository.SaveOrUpdate(vluItemOfFd);
                iValuingItemOfMyFoodOrderOrders.Add(vluItemOfFd);
            };

            for (int i = 0; i < 3; i++)
            {
                ValuingOfMyFoodOrder vluOfFd = new ValuingOfMyFoodOrder()
                {
                    LoginUser = lgu1,
                    Merchant = rest1,
                    MyFoodOrder = iMyFoodOrders[i],
                    ValuingContent = i + "送货速度慢，产品质量差，服务态度恶劣",
                };
                for (int j = 0; j < 3; j++)
                {
                    ScoreOfItemInFoodOrder scoreOfItFd = new ScoreOfItemInFoodOrder()
                    {
                        Score = j,
                        ValuingOfMyFoodOrder = vluOfFd,
                        ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderOrders[j],
                    };
                    vluOfFd.ScoreOfItemInFoodOrders.Add(scoreOfItFd);
                    iValuingItemOfMyFoodOrderOrders[j].ScoreOfItemInFoodOrders.Add(scoreOfItFd);
                };
                iValuingOfMyFoodOrderRepository.SaveOrUpdate(vluOfFd);

                ValuingOfMyFoodOrder vluOfFd2 = new ValuingOfMyFoodOrder()
                {
                    LoginUser = lgu2,
                    Merchant = rest2,
                    MyFoodOrder = iMyFoodOrders[i],
                    ValuingContent = i + "送货速度快，产品质量好，服务态度亲切",

                };
                for (int j = 0; j < 3; j++)
                {
                    ScoreOfItemInFoodOrder scoreOfItFd2 = new ScoreOfItemInFoodOrder()
                    {
                        Score = j,
                        ValuingOfMyFoodOrder = vluOfFd2,
                        ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderOrders[j],
                    };
                    vluOfFd.ScoreOfItemInFoodOrders.Add(scoreOfItFd2);
                    iValuingItemOfMyFoodOrderOrders[j].ScoreOfItemInFoodOrders.Add(scoreOfItFd2);
                };
                iValuingOfMyFoodOrderRepository.SaveOrUpdate(vluOfFd2);
            };



            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> loginUserList = new List<DataFilter>();

            loginUserList.Add(new DataFilter()
            {
                type = "LoginName",
                value = sysLoginName2

            });

            filterList.Add(new DataFilter()
            {
                type = "LoginUser",
                field = loginUserList
            });

            ValuingOfMyFoodOrder vmfd = iValuingOfMyFoodOrderRepository.Search(filterList).FirstOrDefault();

            Assert.IsTrue(vmfd.LoginUser.LoginName == sysLoginName2, string.Format("实际结果：{0}与期望结果{1}不一致", vmfd.LoginUser.LoginName, sysLoginName2));


            List<DataFilter> filterList2 = new List<DataFilter>();
            List<DataFilter> mechentList = new List<DataFilter>();
            mechentList.Add(new DataFilter()
            {
                type = "Name",
                value = rstName
            });
            filterList2.Add(new DataFilter()
            {
                type = "Merchant",
                field = mechentList
            });
            ValuingOfMyFoodOrder vmfd2 = iValuingOfMyFoodOrderRepository.Search(filterList2).FirstOrDefault();

            Assert.IsTrue(vmfd2.Merchant.Name == rstName, string.Format("实际结果：{0}与期望结果{1}不一致", vmfd2.Merchant.Name, rstName));


        }


    }
}
