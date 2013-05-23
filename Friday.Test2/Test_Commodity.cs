﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;
using NHibernate.Cfg;
using friday.core;
using Iesi.Collections.Generic;
using NHibernate.Criterion;
using System.Transactions;

namespace friday.coretest
{
    [TestFixture]
    public class Test_Commodity
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
        public void test_add_shop_and_commodity()
        {
            IShopRepository shoprep = new ShopRepository();
            Shop shop = shoprep.SearchByShortName("银座");

            IGlobalGoodsTypeRepository globalGoodsTyperep = new GlobalGoodsTypeRepository();
            GlobalGoodsType mgt = globalGoodsTyperep.GetGlobalGoodsTypeByName("黄金");

            string ggtfamily = mgt.Family + mgt.Id;

            for (int i = 0; i < 40; i++) 
            {
                Commodity commodity = new Commodity()
                {
                    Name = i+"金戒指",
                    Price = i+10,
                    Image = "/uploadimage/c" + (i%10+1) + ".jpg",
                    IsDiscount = false,
                    InventoryCount = 100,
                    GlobalGoodsType = mgt,
                    GlobalGoodsTypeFamily=ggtfamily,
                    Shop = shop,
                    ValuingCount=i,
                    Amount=i*10,
                    MonthAmount=i*3,
                    AverageValuing = 4,
                    DiscountInventoryCount = 50,
                    DiscountPrice = 8.5,
                    OldPrice = 15,
                    IsEnabled = true,
                    IsLimited = false,
                    Description = "五一大促销"

                };
                new CommodityRepository().SaveOrUpdate(commodity);
            }
            for (int i = 0; i < 40; i++)
            {
                Commodity commodity = new Commodity()
                {
                    Name = i + "铁观音",
                    Price = i + 10,
                    Image = "/uploadimage/c" + (i % 10 + 1) + ".jpg",
                    IsDiscount = false,
                    InventoryCount = 100,
                    GlobalGoodsType = mgt,
                    GlobalGoodsTypeFamily = ggtfamily,
                    Shop = shop,
                    ValuingCount = i,
                    Amount = i * 10,
                    MonthAmount = i*4,
                    AverageValuing = 4,
                    DiscountInventoryCount = 50,
                    DiscountPrice = 8.5,
                    OldPrice = 15,
                    IsEnabled = true,
                    IsLimited = false,
                    Description = "五一大促销"

                };
                new CommodityRepository().SaveOrUpdate(commodity);
            }  
             
        }
       

    }
}
