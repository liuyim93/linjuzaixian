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
    public class Test_Sku
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
        public void test_add_shop_commodity_sku()
        {
            ISkuRepository skurep = new SkuRepository();
            ISkuPropRepository skuProprep = new SkuPropRepository();
            IPropIDRepository propIDrep = new PropIDRepository();
            IPropValueRepository propValuerep = new PropValueRepository();

            IShopRepository shoprep = new ShopRepository();
            Shop shop = shoprep.SearchByShortName("银座");

            IGlobalGoodsTypeRepository globalGoodsTyperep = new GlobalGoodsTypeRepository();
            //MerchantGoodsType mgt1 = merchantGoodsTyperep.GetGoodsTypeByTypeNameAndMerchantID("金制品", shop.Id);
            //MerchantGoodsType mgt = new MerchantGoodsType()
            //{
            //     GoodsType="服装",
            //      Merchant=shop,                   
            //};
            //merchantGoodsTyperep.SaveOrUpdate(mgt);


            //添加规格类型
            IRepository<PropID> iPropIDRepository = UnityHelper.UnityToT<IRepository<PropID>>();
            IList<PropID> iPropIDs = new List<PropID>();

            PropID ppt1 = new PropID()
            {
                //Id = 1627207,
                PropIDName = "颜色",
                IsDelete = false,
                Merchant = shop
            };
            iPropIDs.Add(ppt1);
            PropID ppt2 = new PropID()
            {
                //Id = 21921,
                PropIDName = "尺寸",
                IsDelete = false,
                Merchant = shop
            };
            iPropIDs.Add(ppt2);
            foreach (PropID a in iPropIDs)
            {
                iPropIDRepository.SaveOrUpdate(a);
            }

            //添加规格明细
            IRepository<PropValue> iPropValueRepository = UnityHelper.UnityToT<IRepository<PropValue>>();
            IList<PropValue> iPropValues = new List<PropValue>();
            IRepository<SkuProp> iSkuPropRepository = UnityHelper.UnityToT<IRepository<SkuProp>>();
            //颜色明细
            PropValue ppv1_1 = new PropValue()
            {
                PropValueName = "粉红",
                IsDelete = false,
                PropID = ppt1,
                Merchant = shop
            };
            iPropValues.Add(ppv1_1);
            PropValue ppv1_2 = new PropValue()
            {
                PropValueName = "蓝色",
                IsDelete = false,
                PropID = ppt1,
                Merchant = shop
            };
            iPropValues.Add(ppv1_2);
            PropValue ppv1_3 = new PropValue()
            {
                PropValueName = "橘黄色",
                IsDelete = false,
                PropID = ppt1,
                Merchant = shop
            };
            iPropValues.Add(ppv1_3);
            foreach (PropValue a in iPropValues)
            {
                iPropValueRepository.SaveOrUpdate(a);
            }

            //尺寸明细
            IList<PropValue> iPropValues2 = new List<PropValue>();
            PropValue ppv2_1 = new PropValue()
            {
                PropValueName = "S",
                IsDelete = false,
                PropID = ppt2,
                Merchant = shop
            };
            iPropValues2.Add(ppv2_1);
            PropValue ppv2_2 = new PropValue()
            {
                PropValueName = "M",
                IsDelete = false,
                PropID = ppt2,
                Merchant = shop
            };
            iPropValues2.Add(ppv2_2);
            PropValue ppv2_3 = new PropValue()
            {
                PropValueName = "L",
                IsDelete = false,
                PropID = ppt2,
                Merchant = shop
            };
            iPropValues2.Add(ppv2_3);
            PropValue ppv2_4 = new PropValue()
            {
                PropValueName = "XL",
                IsDelete = false,
                PropID = ppt2,
                Merchant = shop
            };
            iPropValues2.Add(ppv2_4);
            foreach (PropValue a in iPropValues2)
            {
                iPropValueRepository.SaveOrUpdate(a);
            }


            string[] strCommdtyName = { "短袖连衣裙", "裤子", "西装", "短外套", "真皮皮衣", "风衣" };
            for (int i = 0; i < strCommdtyName.Length; i++)
            {
                Commodity commodity = new Commodity()
                {
                    Name = strCommdtyName[i],
                    Price = i + 10,
                    Image = "/uploadimage/c" + (i % 10 + 1) + ".jpg",
                    IsDiscount = false,
                    //InventoryCount = 100,
                    GlobalGoodsType = globalGoodsTyperep.GetGlobalGoodsTypeByName("连衣裙"),
                    //2013-05-09 basilwang 增加family
                    GlobalGoodsTypeFamily = globalGoodsTyperep.GetGlobalGoodsTypeByName("连衣裙").Family,
                    Shop = shop,
                    InventoryCount=i*20+50,
                    ValuingCount = i*5+5,
                    Amount = i * 100+50,
                    MonthAmount = i*10+20,
                    AverageValuing = 4,
                    DiscountInventoryCount = i*5+2,
                    DiscountPrice = 8.5,
                    OldPrice = 15,
                    IsEnabled = true,
                    IsLimited = false,
                    Description = "五一大促销"

                };
                new CommodityRepository().SaveOrUpdate(commodity);

                int skuConut = new Random().Next(12);
                for (int j = 0,l=0,m=0; j <= skuConut; j++)
                {
                    Sku skus = new Sku()
                    {
                        Commodity = commodity,
                        price = 39 + j * 10,
                        priceCent = j,
                        stock = j * 5,
                    };
                    //skus.SKUProps.Add(skpcolor);
                    //skus.SKUProps.Add(skpsize);
                    skurep.SaveOrUpdate(skus);

                   //颜色
                   //int pVauCnColor = new Random().Next(iPropValues.Count);//规格明细
                   SkuProp skpcolor = new SkuProp()
                   {
                       PropID = ppt1,
                       PropValue = iPropValues[l/4],
                       SKU=skus
                   };
                   iSkuPropRepository.SaveOrUpdate(skpcolor);
                   l++;
                   //尺寸
                   //int pVauCntSize = new Random().Next(iPropValues2.Count);//规格明细
                   SkuProp skpsize = new SkuProp()
                   {
                       PropID = ppt2,
                       PropValue = iPropValues2[m%4],
                       SKU=skus
                   };
                   iSkuPropRepository.SaveOrUpdate(skpsize);
                   m++;
                    
                 

                   //iPropValues.Remove(iPropValues[pVauCnColor]);
                   //iPropValues2.Remove(iPropValues2[pVauCntSize]);

                }

            }  
             
        }
       

    }
}
