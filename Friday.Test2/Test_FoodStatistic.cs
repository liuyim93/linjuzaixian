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
            IFoodStatisticRepository iFoodStatisticRepository = UnityHelper.UnityToT<IFoodStatisticRepository>();
            IRepository<Food> iFoodRepository = UnityHelper.UnityToT<IRepository<Food>>();
            IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();
            IRepository<MerchantGoodsType> iMerchantGoodsTypeRepository = UnityHelper.UnityToT<IRepository<MerchantGoodsType>>();
            IList<FoodStatistic> iFoodStatistics = new List<FoodStatistic>();

            string rstName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string rstName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string mgName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string mgName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string fdName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string fdName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            Restaurant rst1 = new Restaurant()
            {
                Name = rstName1,
                 MerchantType=0
            };
            iRestaurantRepository.SaveOrUpdate(rst1);

            MerchantGoodsType mg1 = new MerchantGoodsType()
            {
                Merchant = rst1,
                GoodsType = mgName1
            };
            iMerchantGoodsTypeRepository.SaveOrUpdate(mg1);



            Restaurant rst2 = new Restaurant()
            {
                Name = rstName2,
                MerchantType = 0
            };
            iRestaurantRepository.SaveOrUpdate(rst2);

            MerchantGoodsType mg2 = new MerchantGoodsType()
            {
                Merchant = rst2,
                GoodsType = mgName2
            };
            iMerchantGoodsTypeRepository.SaveOrUpdate(mg2);

            Food fd1 = new Food()
            {
                Name = fdName1,
                Amount = 100,
                Restaurant = rst1,
                MerchantGoodsType = mg1
            };
            iFoodRepository.SaveOrUpdate(fd1);

            Food fd2 = new Food()
            {
                Name = fdName2,
                Amount = 100,
                Restaurant = rst2,
                MerchantGoodsType = mg2
            };
            iFoodRepository.SaveOrUpdate(fd2);

            for (int i = 0; i < 10; i++) 
            {

                FoodStatistic fdstc1 = new FoodStatistic()
                {
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    AverageValuing = i,
                    ValuingCount = i,
                    Amount = i,
                    Food = fd1
                };
                iFoodStatisticRepository.SaveOrUpdate(fdstc1);

                FoodStatistic fdstc2 = new FoodStatistic()
                {
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    AverageValuing = i,
                    ValuingCount = i,
                    Amount = i,
                    Food = fd2
                };
                iFoodStatisticRepository.SaveOrUpdate(fdstc2);
            }


            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> foodList = new List<DataFilter>();
    
                foodList.Add(new DataFilter()
                {
                    type = "Food",
                    value = fd2.Id

                });
                filterList.Add(new DataFilter()
                {
                    type = "Food",
                    field = foodList
                });


                FoodStatistic fdstc = iFoodStatisticRepository.Search(filterList).FirstOrDefault();

                Assert.IsTrue(fdstc.Food.Name == fdName2, string.Format("实际结果：{0}与期望结果{1}不一致", fdstc.Food.Name, fdName2));
        

            

        }

     
    }
}
