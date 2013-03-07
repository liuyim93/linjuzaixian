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
    public class Test_HouseStatistic
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
            IHouseStatisticRepository iHouseStatisticRepository = UnityHelper.UnityToT<IHouseStatisticRepository>();
            IRepository<House> iHouseRepository = UnityHelper.UnityToT<IRepository<House>>();
            IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
            IRepository<MerchantGoodsType> iMerchantGoodsTypeRepository = UnityHelper.UnityToT<IRepository<MerchantGoodsType>>();
            IList<HouseStatistic> iHouseStatistics = new List<HouseStatistic>();

            string rtName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string rtName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string mgName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string mgName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string huName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string huName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            Rent rst1 = new Rent()
            {
                Name = rtName1,
                 MerchantType=0
            };
            iRentRepository.SaveOrUpdate(rst1);

            MerchantGoodsType mg1 = new MerchantGoodsType()
            {
                Merchant = rst1,
                GoodsType = mgName1
            };
            iMerchantGoodsTypeRepository.SaveOrUpdate(mg1);



            Rent rst2 = new Rent()
            {
                Name = rtName2,
                MerchantType = 0
            };
            iRentRepository.SaveOrUpdate(rst2);

            MerchantGoodsType mg2 = new MerchantGoodsType()
            {
                Merchant = rst2,
                GoodsType = mgName2
            };
            iMerchantGoodsTypeRepository.SaveOrUpdate(mg2);

            House hu1 = new House()
            {
                Name = huName1,
                Amount = 100,
                Rent = rst1,
                MerchantGoodsType = mg1,
                 TimeOfRentFrom=DateTime.Now,
                  TimeOfRentTO=DateTime.Now
            };
            iHouseRepository.SaveOrUpdate(hu1);

            House hu2 = new House()
            {
                Name = huName2,
                Amount = 100,
                Rent = rst2,
                MerchantGoodsType = mg2,
                TimeOfRentFrom = DateTime.Now,
                TimeOfRentTO = DateTime.Now
            };
            iHouseRepository.SaveOrUpdate(hu2);

            for (int i = 0; i < 10; i++) 
            {

                HouseStatistic fdstc1 = new HouseStatistic()
                {
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    AverageValuing = i,
                    ValuingCount = i,
                    Amount = i,
                    House = hu1
                };
                iHouseStatisticRepository.SaveOrUpdate(fdstc1);

                HouseStatistic fdstc2 = new HouseStatistic()
                {
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    AverageValuing = i,
                    ValuingCount = i,
                    Amount = i,
                    House = hu2
                };
                iHouseStatisticRepository.SaveOrUpdate(fdstc2);
            }


            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> houseList = new List<DataFilter>();
    
                houseList.Add(new DataFilter()
                {
                    type = "House",
                    value = hu2.Id

                });
                filterList.Add(new DataFilter()
                {
                    type = "House",
                    field = houseList
                });


                HouseStatistic fdstc = iHouseStatisticRepository.Search(filterList).FirstOrDefault();

                Assert.IsTrue(fdstc.House.Name == huName2, string.Format("实际结果：{0}与期望结果{1}不一致", fdstc.House.Name, huName2));
        

            

        }

     
    }
}
