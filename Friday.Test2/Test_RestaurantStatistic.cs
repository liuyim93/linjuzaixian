using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
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
            IRepository<RestaurantStatistic> iRestaurantStatisticRepository = UnityHelper.UnityToT<IRepository<RestaurantStatistic>>();

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
                RestaurantStatistic rstSta = new RestaurantStatistic()
                {
                      Amount=i,
                      ValuingCount=i,
                    AverageValuing=i,

                };
            }

        
                        
        }

     
    }
}
