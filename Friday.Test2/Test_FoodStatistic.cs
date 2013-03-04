using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_FoodStatistic
    {
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
                 Name="天外村",
                 
            };
            iRestaurantRepository.SaveOrUpdate(rst);

            MerchantGoodsType mg = new MerchantGoodsType()
            {
                 Merchant=rst,
                  GoodsType="生活用品"
            };
            iMerchantGoodsTypeRepository.SaveOrUpdate(mg);

            Food fd = new Food()
            {
               Name="牙刷",
               Amount=100,
               Restaurant=rst,
                MerchantGoodsType=mg
            };
            iFoodRepository.SaveOrUpdate(fd);


            FoodStatistic fs = new FoodStatistic()
            {
                 Food=fd,
                 Amount=10,
                  Year=2013,
                  Month=1,
                  Day=1
            };
            iFoodStatisticRepository.SaveOrUpdate(fs);
            
            FoodStatistic fs2 = new FoodStatistic()
            {
                Food = fd,
                Amount = 8,
                Year = 2013,
                Month = 1,
                Day = 2
            };
            iFoodStatisticRepository.SaveOrUpdate(fs2);

            FoodStatistic fs3 = new FoodStatistic()
            {
                Food = fd,
                Amount = 7,
                Year = 2013,
                Month = 1,
                Day = 3
            };
            iFoodStatisticRepository.SaveOrUpdate(fs3);
         

        }

     
    }
}
