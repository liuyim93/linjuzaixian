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
    public class Test_ValuingOfMyCommodityOrder
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

            IShopRepository iShopRepository = UnityHelper.UnityToT<IShopRepository>();
            ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
            ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();

            IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

            IRepository<MyCommodityOrder> iMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<MyCommodityOrder>>();

            IValuingOfMyCommodityOrderRepository iValuingOfMyCommodityOrderRepository = UnityHelper.UnityToT<IValuingOfMyCommodityOrderRepository>();
            IRepository<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyCommodityOrder>>();
            IRepository<ScoreOfItemInCommodityOrder> iScoreOfItemInCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInCommodityOrder>>();

            IList<Shop> iShops = new List<Shop>();
            IList<MyCommodityOrder> iMyCommodityOrders = new List<MyCommodityOrder>();
            IList<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderOrders = new List<ValuingItemOfMyCommodityOrder>();

            string shpName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string shpName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string loginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string ownerName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string ownerName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            string sysName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysLoginName = Guid.NewGuid().ToString().GetHashCode().ToString();
            string sysLoginName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            Shop rest1 = new Shop()
            {
                Name = shpName,
                Owener = ownerName,
            };
            iShopRepository.SaveOrUpdate(rest1);

            LoginUser lu1 = new LoginUser();
            lu1.LoginName = loginName;
            lu1.Password = loginName;
            iLoginUserRepository.SaveOrUpdate(lu1);

            LoginUserOfMerchant lum = new LoginUserOfMerchant();
            lum.Merchant = rest1;
            lum.LoginUser = lu1;
            iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

            Shop rest2 = new Shop()
            {
                Name = shpName2,
                Owener = ownerName2,
            };
            iShopRepository.SaveOrUpdate(rest2);

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
                MyCommodityOrder mfdorder = new MyCommodityOrder()
                {
                    Linkman = sysuser1.Name,
                    SystemUser = sysuser1,
                    Shop = rest1,
                    EntityIndex = 1,
                    Tel = "111111111110",
                    OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),
                    OrderStatus = MyOrderStatusEnum.成功,
                    SendTime = "11:20",
                    Description = "不要辣椒"
                };
                iMyCommodityOrderRepository.SaveOrUpdate(mfdorder);
                iMyCommodityOrders.Add(mfdorder);

                MyCommodityOrder mfdorder2 = new MyCommodityOrder()
                {
                    Linkman = sysuser2.Name,
                    SystemUser = sysuser2,
                    Shop = rest2,
                    EntityIndex = 1,
                    Tel = "111111111110",
                    OrderNumber = DateTime.Now.ToString("yyyyMMddhhmmssfff"),
                    OrderStatus = MyOrderStatusEnum.成功,
                    SendTime = "11:20",
                    Description = "不要辣椒"
                };
                iMyCommodityOrderRepository.SaveOrUpdate(mfdorder2);
                iMyCommodityOrders.Add(mfdorder2);
            };

            string[] vItemArray = { "送货速度", "服务态度", "商品质量" };
            foreach (var i in vItemArray)
            {
                ValuingItemOfMyCommodityOrder vluItemOfFd = new ValuingItemOfMyCommodityOrder()
                {
                    ValuingItemName = i
                };
                iValuingItemOfMyCommodityOrderRepository.SaveOrUpdate(vluItemOfFd);
                iValuingItemOfMyCommodityOrderOrders.Add(vluItemOfFd);
            };

            for (int i = 0; i < 3; i++)
            {
                ValuingOfMyCommodityOrder vluOfCmd = new ValuingOfMyCommodityOrder()
                {
                    LoginUser = lgu1,
                    Merchant = rest1,
                    MyCommodityOrder = iMyCommodityOrders[i],
                    ValuingContent = i + "送货速度慢，产品质量差，服务态度恶劣",
                };
                for (int j = 0; j < 3; j++)
                {
                    ScoreOfItemInCommodityOrder scoreOfItCmd = new ScoreOfItemInCommodityOrder()
                    {
                        Score = j,
                        ValuingOfMyCommodityOrder = vluOfCmd,
                        ValuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderOrders[j],
                    };
                    vluOfCmd.ScoreOfItemInCommodityOrders.Add(scoreOfItCmd);
                    iValuingItemOfMyCommodityOrderOrders[j].ScoreOfItemInCommodityOrders.Add(scoreOfItCmd);
                };
                iValuingOfMyCommodityOrderRepository.SaveOrUpdate(vluOfCmd);

                ValuingOfMyCommodityOrder vluOfCmd2 = new ValuingOfMyCommodityOrder()
                {
                    LoginUser = lgu2,
                    Merchant = rest2,
                    MyCommodityOrder = iMyCommodityOrders[i],
                    ValuingContent = i + "送货速度快，产品质量好，服务态度亲切",

                };
                for (int j = 0; j < 3; j++)
                {
                    ScoreOfItemInCommodityOrder scoreOfItCmd2 = new ScoreOfItemInCommodityOrder()
                    {
                        Score = j,
                        ValuingOfMyCommodityOrder = vluOfCmd2,
                        ValuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderOrders[j],
                    };
                    vluOfCmd.ScoreOfItemInCommodityOrders.Add(scoreOfItCmd2);
                    iValuingItemOfMyCommodityOrderOrders[j].ScoreOfItemInCommodityOrders.Add(scoreOfItCmd2);
                };
                iValuingOfMyCommodityOrderRepository.SaveOrUpdate(vluOfCmd2);
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

            ValuingOfMyCommodityOrder vmCmd = iValuingOfMyCommodityOrderRepository.Search(filterList).FirstOrDefault();

            Assert.IsTrue(vmCmd.LoginUser.LoginName == sysLoginName2, string.Format("实际结果：{0}与期望结果{1}不一致", vmCmd.LoginUser.LoginName, sysLoginName2));


            List<DataFilter> filterList2 = new List<DataFilter>();
            List<DataFilter> mechentList = new List<DataFilter>();
            mechentList.Add(new DataFilter()
            {
                type = "Name",
                value = shpName
            });
            filterList2.Add(new DataFilter()
            {
                type = "Merchant",
                field = mechentList
            });
            ValuingOfMyCommodityOrder vmCmd2 = iValuingOfMyCommodityOrderRepository.Search(filterList2).FirstOrDefault();

            Assert.IsTrue(vmCmd2.Merchant.Name == shpName, string.Format("实际结果：{0}与期望结果{1}不一致", vmCmd2.Merchant.Name, shpName));


        }


    }
}
