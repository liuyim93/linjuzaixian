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
    public class Test_ValuingOfMyHouseOrder
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
        public void Test()
        {

            IRentRepository iRentRepository = UnityHelper.UnityToT<IRentRepository>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
            ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();

            IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

            IRepository<MyHouseOrder> iMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<MyHouseOrder>>();

            IValuingOfMyHouseOrderRepository iValuingOfMyHouseOrderRepository = UnityHelper.UnityToT<IValuingOfMyHouseOrderRepository>();
            IRepository<ValuingItemOfMyHouseOrder> iValuingItemOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyHouseOrder>>();
            IRepository<ScoreOfItemInHouseOrder> iScoreOfItemInHouseOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInHouseOrder>>();

            IList<Rent> iRents = new List<Rent>();
            IList<MyHouseOrder> iMyHouseOrders = new List<MyHouseOrder>();
            IList<ValuingItemOfMyHouseOrder> iValuingItemOfMyHouseOrderOrders = new List<ValuingItemOfMyHouseOrder>();

            string rtName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string rtName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string ownerName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string ownerName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            string sysName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysLoginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysLoginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            Rent rest1 = new Rent()
            {
                Name = rtName,
                Owener = ownerName,
            };
            iRentRepository.SaveOrUpdate(rest1);

            LoginUser lu1 = new LoginUser();
            lu1.LoginName = loginName;
            lu1.Password = loginName;
            iLoginUserRepository.SaveOrUpdate(lu1);

            LoginUserOfMerchant lum = new LoginUserOfMerchant();
            lum.Merchant = rest1;
            lum.LoginUser = lu1;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

            Rent rest2 = new Rent()
            {
                Name = rtName2,
                Owener = ownerName2,
            };
            iRentRepository.SaveOrUpdate(rest2);

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
                MyHouseOrder mfdorder = new MyHouseOrder()
                {
                    Linkman = sysuser1.Name,
                    SystemUser = sysuser1,
                    Rent = rest1,
                    EntityIndex = 1,
                    Tel = "111111111110",
                    OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),
                    OrderStatus = MyOrderStatusEnum.成功,
                    SendTime = "11:20",
                };
                iMyHouseOrderRepository.SaveOrUpdate(mfdorder);
                iMyHouseOrders.Add(mfdorder);

                MyHouseOrder mfdorder2 = new MyHouseOrder()
                {
                    Linkman = sysuser2.Name,
                    SystemUser = sysuser2,
                    Rent = rest2,
                    EntityIndex = 1,
                    Tel = "111111111110",
                    OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),
                    OrderStatus = MyOrderStatusEnum.成功,
                    SendTime = "11:20",
                };
                iMyHouseOrderRepository.SaveOrUpdate(mfdorder2);
                iMyHouseOrders.Add(mfdorder2);
            };

            string[] vItemArray = { "送货速度", "服务态度", "商品质量" };
            foreach (var i in vItemArray)
            {
                ValuingItemOfMyHouseOrder vluItemOfFd = new ValuingItemOfMyHouseOrder()
                {
                    ValuingItemName = i
                };
                iValuingItemOfMyHouseOrderRepository.SaveOrUpdate(vluItemOfFd);
                iValuingItemOfMyHouseOrderOrders.Add(vluItemOfFd);
            };

            for (int i = 0; i < 3; i++)
            {
                ValuingOfMyHouseOrder vluOfFd = new ValuingOfMyHouseOrder()
                {
                    LoginUser = lgu1,
                    Merchant = rest1,
                    MyHouseOrder = iMyHouseOrders[i],
                    ValuingContent = i + "送货速度慢，产品质量差，服务态度恶劣",
                };
                for (int j = 0; j < 3; j++)
                {
                    ScoreOfItemInHouseOrder scoreOfItFd = new ScoreOfItemInHouseOrder()
                    {
                        Score = j,
                        ValuingOfMyHouseOrder = vluOfFd,
                        ValuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderOrders[j],
                    };
                    vluOfFd.ScoreOfItemInHouseOrders.Add(scoreOfItFd);
                    iValuingItemOfMyHouseOrderOrders[j].ScoreOfItemInHouseOrders.Add(scoreOfItFd);
                };
                iValuingOfMyHouseOrderRepository.SaveOrUpdate(vluOfFd);

                ValuingOfMyHouseOrder vluOfFd2 = new ValuingOfMyHouseOrder()
                {
                    LoginUser = lgu2,
                    Merchant = rest2,
                    MyHouseOrder = iMyHouseOrders[i],
                    ValuingContent = i + "送货速度快，产品质量好，服务态度亲切",

                };
                for (int j = 0; j < 3; j++)
                {
                    ScoreOfItemInHouseOrder scoreOfItFd2 = new ScoreOfItemInHouseOrder()
                    {
                        Score = j,
                        ValuingOfMyHouseOrder = vluOfFd2,
                        ValuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderOrders[j],
                    };
                    vluOfFd.ScoreOfItemInHouseOrders.Add(scoreOfItFd2);
                    iValuingItemOfMyHouseOrderOrders[j].ScoreOfItemInHouseOrders.Add(scoreOfItFd2);
                };
                iValuingOfMyHouseOrderRepository.SaveOrUpdate(vluOfFd2);
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

            ValuingOfMyHouseOrder vmho = iValuingOfMyHouseOrderRepository.Search(filterList).FirstOrDefault();

            Assert.IsTrue(vmho.LoginUser.LoginName == sysLoginName2, string.Format("实际结果：{0}与期望结果{1}不一致", vmho.LoginUser.LoginName, sysLoginName2));


            List<DataFilter> filterList2 = new List<DataFilter>();
            List<DataFilter> mechentList = new List<DataFilter>();
            mechentList.Add(new DataFilter()
            {
                type = "Name",
                value = rtName
            });
            filterList2.Add(new DataFilter()
            {
                type = "Merchant",
                field = mechentList
            });
            ValuingOfMyHouseOrder vmho2 = iValuingOfMyHouseOrderRepository.Search(filterList2).FirstOrDefault();

            Assert.IsTrue(vmho2.Merchant.Name == rtName, string.Format("实际结果：{0}与期望结果{1}不一致", vmho2.Merchant.Name, rtName));


        }


    }
}
