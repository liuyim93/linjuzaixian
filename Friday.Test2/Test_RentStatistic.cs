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
    public class Test_RentStatistic
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
            IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
            IRentStatisticRepository iRentStatisticRepository = UnityHelper.UnityToT<IRentStatisticRepository>();

            IList<RentStatistic> iRentStatistics = new List<RentStatistic>();

            string rtName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string rtName2 = Guid.NewGuid().ToString().GetHashCode().ToString();


            Rent rt1 = new Rent()
            {
                Name = rtName1,
                MerchantType=0
            };
            iRentRepository.SaveOrUpdate(rt1);
            Rent rt2 = new Rent()
            {
                Name = rtName2,
                MerchantType = 0
            };
            iRentRepository.SaveOrUpdate(rt2);

            for (int i = 0; i<10;i++ )
            {
                RentStatistic rtSta1 = new RentStatistic()
                {
                      Amount=i,
                      ValuingCount=i,
                      AverageValuing=i,
                      Year=2013,
                      Month=3,
                      Day=i,
                      Rent=rt1


                };
                iRentStatisticRepository.SaveOrUpdate(rtSta1);

                RentStatistic rtSta2 = new RentStatistic()
                {
                    Amount = i,
                    ValuingCount = i,
                    AverageValuing = i,
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    Rent = rt2


                };
                iRentStatisticRepository.SaveOrUpdate(rtSta2);
            }

            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> RestfList = new List<DataFilter>();

            RestfList.Add(new DataFilter()
            {
                type = "Rent",
                value =rt1.Id
            });
            filterList.Add(new DataFilter() 
            {
                type = "Rent",
                field=RestfList
            });

            RentStatistic  rstc=iRentStatisticRepository.Search(filterList).FirstOrDefault();

            Assert.IsTrue(rstc.Rent.Name == rtName1, string.Format("实际结果：{0}与期望结果{1}不一致", rstc.Rent.Name, rtName1));
        

        
                        
        }

     
    }
}
