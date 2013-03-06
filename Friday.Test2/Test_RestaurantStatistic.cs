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
    public class Test_RestaurantStatistic
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
            IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();
            IRestaurantStatisticRepository iRestaurantStatisticRepository = UnityHelper.UnityToT<IRestaurantStatisticRepository>();

            IList<RestaurantStatistic> iRestaurantStatistics = new List<RestaurantStatistic>();

            string rstName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string rstName2 = Guid.NewGuid().ToString().GetHashCode().ToString();


            Restaurant rst1 = new Restaurant()
            {
                Name = rstName1,
                MerchantType=0
            };
            iRestaurantRepository.SaveOrUpdate(rst1);
            Restaurant rst2 = new Restaurant()
            {
                Name = rstName2,
                MerchantType = 0
            };
            iRestaurantRepository.SaveOrUpdate(rst2);

            for (int i = 0; i<10;i++ )
            {
                RestaurantStatistic rstSta1 = new RestaurantStatistic()
                {
                      Amount=i,
                      ValuingCount=i,
                      AverageValuing=i,
                      Year=2013,
                      Month=3,
                      Day=i,
                      Restaurant=rst1


                };
                iRestaurantStatisticRepository.SaveOrUpdate(rstSta1);

                RestaurantStatistic rstSta2 = new RestaurantStatistic()
                {
                    Amount = i,
                    ValuingCount = i,
                    AverageValuing = i,
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    Restaurant = rst2


                };
                iRestaurantStatisticRepository.SaveOrUpdate(rstSta2);
            }

            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> RestfList = new List<DataFilter>();

            RestfList.Add(new DataFilter()
            {
                type = "Restaurant",
                value =rst1.Id
            });
            filterList.Add(new DataFilter() 
            {
                type = "Restaurant",
                field=RestfList
            });

            RestaurantStatistic  rstc=iRestaurantStatisticRepository.Search(filterList).FirstOrDefault();

            Assert.IsTrue(rstc.Restaurant.Name == rstName1, string.Format("实际结果：{0}与期望结果{1}不一致", rstc.Restaurant.Name, rstName1));
        

        
                        
        }

     
    }
}
