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
    public class Test_FoodStatistic
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
            IRepository<FoodStatistic> iFoodStatisticRepository = UnityHelper.UnityToT<IRepository<FoodStatistic>>();
            IRepository<Food> iFoodRepository = UnityHelper.UnityToT<IRepository<Food>>();
            IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();
            IRepository<MerchantGoodsType> iMerchantGoodsTypeRepository = UnityHelper.UnityToT<IRepository<MerchantGoodsType>>();
            IList<FoodStatistic> iFoodStatistics = new List<FoodStatistic>();


            Restaurant rst = new Restaurant()
            {
                Name = "银座超市",
                 MerchantType=0

            };
            iRestaurantRepository.SaveOrUpdate(rst);

            MerchantGoodsType mg = new MerchantGoodsType()
            {
                Merchant = rst,
                GoodsType = "体育用品"
            };
            iMerchantGoodsTypeRepository.SaveOrUpdate(mg);

            Food fd = new Food()
            {
                Name = "羽毛球",
                Amount = 100,
                Restaurant = rst,
                MerchantGoodsType = mg
            };
            iFoodRepository.SaveOrUpdate(fd);

            Food fd2 = new Food()
            {
                Name = "排球",
                Amount = 100,
                Restaurant = rst,
                MerchantGoodsType = mg
            };
            iFoodRepository.SaveOrUpdate(fd2);

            Food fd3 = new Food()
            {
                Name = "乒乓球",
                Amount = 100,
                Restaurant = rst,
                MerchantGoodsType = mg
            };
            iFoodRepository.SaveOrUpdate(fd3);

            //FoodStatistic fs = new FoodStatistic()
            //{
            //     Food=fd,
            //     Amount=10,
            //      Year=2013,
            //      Month=1,
            //      Day=1
            //};
            //iFoodStatisticRepository.SaveOrUpdate(fs);
            
            //FoodStatistic fs2 = new FoodStatistic()
            //{
            //    Food = fd,
            //    Amount = 8,
            //    Year = 2013,
            //    Month = 1,
            //    Day = 2
            //};
            //iFoodStatisticRepository.SaveOrUpdate(fs2);

            //FoodStatistic fs3 = new FoodStatistic()
            //{
            //    Food = fd,
            //    Amount = 7,
            //    Year = 2013,
            //    Month = 1,
            //    Day = 3
            //};
            //iFoodStatisticRepository.SaveOrUpdate(fs3);


            //IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
            //IRepository<House> iHouseRepository = UnityHelper.UnityToT<IRepository<House>>();
            //Rent rt = new Rent()
            //{
            //    Name = "安泰置业",

            //};
            //iRentRepository.SaveOrUpdate(rt);

            //MerchantGoodsType mgt = new MerchantGoodsType()
            //{
            //    Merchant = rt,
            //    GoodsType = "学区房"
            //};
            //iMerchantGoodsTypeRepository.SaveOrUpdate(mgt);

            //House h = new House()
            //{
            //    Name = "山财大学区房",
            //    Amount = 100,
            //     Rent = rt,
            //    MerchantGoodsType = mgt,
            //    TimeOfRentFrom=DateTime.Now,
            //     TimeOfRentTO=DateTime.Now
            //};
            //iHouseRepository.SaveOrUpdate(h);

        }

     
    }
}
