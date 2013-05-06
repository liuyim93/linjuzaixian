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
    public class Test_CommodityStatistic
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
            ICommodityStatisticRepository iCommodityStatisticRepository = UnityHelper.UnityToT<ICommodityStatisticRepository>();
            IRepository<Commodity> iCommodityRepository = UnityHelper.UnityToT<IRepository<Commodity>>();
            IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
            IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository = new GlobalGoodsTypeRepository();
            IList<CommodityStatistic> iCommodityStatistics = new List<CommodityStatistic>();

            string shpName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string shpName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string mgName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string mgName2 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string cmdName1 = Guid.NewGuid().ToString().GetHashCode().ToString();
            string cmdName2 = Guid.NewGuid().ToString().GetHashCode().ToString();

            Shop shp1 = new Shop()
            {
                Name = shpName1,
                 MerchantType=0
            };
            iShopRepository.SaveOrUpdate(shp1);

            //MerchantGoodsType mg1 = new MerchantGoodsType()
            //{
            //    Merchant = shp1,
            //    GoodsType = mgName1
            //};
            //iMerchantGoodsTypeRepository.SaveOrUpdate(mg1);



            Shop shp2 = new Shop()
            {
                Name = shpName2,
                MerchantType = 0
            };
            iShopRepository.SaveOrUpdate(shp2);

            //MerchantGoodsType mg2 = new MerchantGoodsType()
            //{
            //    Merchant = shp2,
            //    GoodsType = mgName2
            //};
            //iMerchantGoodsTypeRepository.SaveOrUpdate(mg2);

            Commodity cmd1 = new Commodity()
            {
                Name = cmdName1,
                Amount = 100,
                Shop = shp1,
                GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("黄金")
            };
            iCommodityRepository.SaveOrUpdate(cmd1);

            Commodity cmd2 = new Commodity()
            {
                Name = cmdName2,
                Amount = 100,
                Shop = shp2,
                GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("钻石")
            };
            iCommodityRepository.SaveOrUpdate(cmd2);

            for (int i = 0; i < 10; i++) 
            {

                CommodityStatistic fdstc1 = new CommodityStatistic()
                {
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    AverageValuing = i,
                    ValuingCount = i,
                    Amount = i,
                    Commodity = cmd1
                };
                iCommodityStatisticRepository.SaveOrUpdate(fdstc1);

                CommodityStatistic fdstc2 = new CommodityStatistic()
                {
                    Year = 2013,
                    Month = 3,
                    Day = i,
                    AverageValuing = i,
                    ValuingCount = i,
                    Amount = i,
                    Commodity = cmd2
                };
                iCommodityStatisticRepository.SaveOrUpdate(fdstc2);
            }


            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> commodityList = new List<DataFilter>();
    
                commodityList.Add(new DataFilter()
                {
                    type = "Commodity",
                    value = cmd2.Id

                });
                filterList.Add(new DataFilter()
                {
                    type = "Commodity",
                    field = commodityList
                });


                CommodityStatistic fdstc = iCommodityStatisticRepository.Search(filterList).FirstOrDefault();

                Assert.IsTrue(fdstc.Commodity.Name == cmdName2, string.Format("实际结果：{0}与期望结果{1}不一致", fdstc.Commodity.Name, cmdName2));
        

            

        }

     
    }
}
