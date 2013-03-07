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
    public class Test_ShopStatistic
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
            IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
            IShopStatisticRepository iShopStatisticRepository = UnityHelper.UnityToT<IShopStatisticRepository>();

            IList<ShopStatistic> iShopStatistics = new List<ShopStatistic>();

            string shpName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string shpName2 = Guid.NewGuid().ToString().GetHashCode().ToString();


            Shop rst1 = new Shop()
            {
                Name = shpName1,
                MerchantType=0
            };
            iShopRepository.SaveOrUpdate(rst1);
            Shop rst2 = new Shop()
            {
                Name = shpName2,
                MerchantType = 0
            };
            iShopRepository.SaveOrUpdate(rst2);

            for (int i = 0; i<10;i++ )
            {
                ShopStatistic rstSta1 = new ShopStatistic()
                {
                      Amount=i,
                      ValuingCount=i,
                      AverageValuing=i,
                      Year=2013,
                      Month=3,
                      Day=i,
                      Shop=rst1


                };
                iShopStatisticRepository.SaveOrUpdate(rstSta1);

                ShopStatistic rstSta2 = new ShopStatistic()
                {
                    Amount = i,
                    ValuingCount = i,
                    AverageValuing = i,
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    Shop = rst2


                };
                iShopStatisticRepository.SaveOrUpdate(rstSta2);
            }

            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> RestfList = new List<DataFilter>();

            RestfList.Add(new DataFilter()
            {
                type = "Shop",
                value =rst1.Id
            });
            filterList.Add(new DataFilter() 
            {
                type = "Shop",
                field=RestfList
            });

            ShopStatistic  sstc=iShopStatisticRepository.Search(filterList).FirstOrDefault();

            Assert.IsTrue(sstc.Shop.Name == shpName1, string.Format("实际结果：{0}与期望结果{1}不一致", sstc.Shop.Name, shpName1));
        

        
                        
        }

     
    }
}
