using System;
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
        //private TransactionScope scope;
        //[SetUp]
        //public void SetUp()
        //{
        //    scope = new TransactionScope();
        //}

        //[TearDown]
        //public void TearDown()
        //{
        //    scope.Dispose();
        //}
        [Test]
        public void test_add_shop_and_commodity()
        {
            IShopRepository shoprep = new ShopRepository();
            Shop shop = shoprep.SearchByShortName("银座");

            IGlobalGoodsTypeRepository globalGoodsTyperep = new GlobalGoodsTypeRepository();
            GlobalGoodsType mgt = globalGoodsTyperep.GetGlobalGoodsTypeByName("黄金");

            ISkuRepository skurep = new SkuRepository();
            ISkuPropRepository skuProprep = new SkuPropRepository();
            IPropIDRepository propIDrep = new PropIDRepository();
            IPropValueRepository propValuerep = new PropValueRepository();
            IList<PropValue> iPropValues = new List<PropValue>();
            IList<PropValue> iPropValues2 = new List<PropValue>();
            IRepository<SkuProp> iSkuPropRepository = UnityHelper.UnityToT<IRepository<SkuProp>>();
            PropID ppt1 = propIDrep.getPropIDbyMerchantAndPropIDName(shop.Id, "颜色");
            PropID ppt2 = propIDrep.getPropIDbyMerchantAndPropIDName(shop.Id, "尺寸");
            iPropValues = propValuerep.GetAllByMerchantAndPropIDName(shop.Id, "颜色");
            iPropValues2 = propValuerep.GetAllByMerchantAndPropIDName(shop.Id, "尺寸");


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
               

                int skuConut = new Random().Next(12);
                for (int j = 0, l = 0, m = 0; j <= skuConut; j++)
                {
                    Sku skus = new Sku()
                    {
                        Commodity = commodity,
                        price = skuConut*10 + j * 10,
                        priceCent = j,
                        stock = j * 5,
                    };
                    skurep.SaveOrUpdate(skus);

                    //颜色
                    //int pVauCnColor = new Random().Next(iPropValues.Count);//规格明细
                    SkuProp skpcolor = new SkuProp()
                    {
                        PropID = ppt1,
                        PropValue = iPropValues[l / 4],
                        SKU = skus
                    };
                    iSkuPropRepository.SaveOrUpdate(skpcolor);
                    l++;
                    //尺寸
                    //int pVauCntSize = new Random().Next(iPropValues2.Count);//规格明细
                    SkuProp skpsize = new SkuProp()
                    {
                        PropID = ppt2,
                        PropValue = iPropValues2[m % 4],
                        SKU = skus
                    };
                    iSkuPropRepository.SaveOrUpdate(skpsize);
                    m++; 

                }
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



                int skuConut = new Random().Next(12);
                for (int j = 0, l = 0, m = 0; j <= skuConut; j++)
                {
                    Sku skus = new Sku()
                    {
                        Commodity = commodity,
                        price = skuConut*10 + j * 10,
                        priceCent = j,
                        stock = j * 5,
                    };
                    skurep.SaveOrUpdate(skus);

                    //颜色
                    //int pVauCnColor = new Random().Next(iPropValues.Count);//规格明细
                    SkuProp skpcolor = new SkuProp()
                    {
                        PropID = ppt1,
                        PropValue = iPropValues[l / 4],
                        SKU = skus
                    };
                    iSkuPropRepository.SaveOrUpdate(skpcolor);
                    l++;
                    //尺寸
                    //int pVauCntSize = new Random().Next(iPropValues2.Count);//规格明细
                    SkuProp skpsize = new SkuProp()
                    {
                        PropID = ppt2,
                        PropValue = iPropValues2[m % 4],
                        SKU = skus
                    };
                    iSkuPropRepository.SaveOrUpdate(skpsize);
                    m++;

                }
            }  
             
        }
       

    }
}
