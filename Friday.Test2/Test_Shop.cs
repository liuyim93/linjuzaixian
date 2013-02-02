using System;
using System.Collections.Generic;
using System.Text;
using Gallio.Framework;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.EnumType;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_Shop
    {
        [Test]
        public void Test()
        {
            IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
            IList<Shop> iShops = new List<Shop>();

            Shop s1 = new Shop()
            {
                 Distance="10", Address="erhuan10", Email="ocam10@163.com", EntityIndex=10, Name="ele10", Owener="basil10", Rate=10 

            };
            iShops.Add(s1);
            Shop s2 = new Shop()
            {
                Distance = "20", Address = "erhuan20",Email = "ocam20@163.com",EntityIndex = 20,Name = "ele20",Owener = "basil20",Rate = 20
            };
            iShops.Add(s2);
            Shop s3 = new Shop()
            {
                Distance = "30",Address = "erhuan30",Email = "ocam30@163.com",EntityIndex = 30,Name = "ele30",Owener = "basil30",Rate = 30

            };
            iShops.Add(s3);
            foreach (Shop a in iShops)
            {
                iShopRepository.SaveOrUpdate(a);
            }

        }

        [Test]
        public void AddGlobalGoodsType()
        {
            IRepository<GlobalGoodsType> iGlobalGoodsTypeRepository = UnityHelper.UnityToT<IRepository<GlobalGoodsType>>();
            IList<GlobalGoodsType> iGlobalGoodsTypes = new List<GlobalGoodsType>();

            GlobalGoodsType s1 = new GlobalGoodsType()
            {
                GoodsType = "数码产品",
                MerchantType = MerchantTypeEnum.百货

            };
            iGlobalGoodsTypes.Add(s1);
            GlobalGoodsType s2 = new GlobalGoodsType()
            {
                GoodsType = "面条",
                MerchantType = MerchantTypeEnum.餐馆
            };
            iGlobalGoodsTypes.Add(s2);
            GlobalGoodsType s3 = new GlobalGoodsType()
            {
                GoodsType = "别墅",
                MerchantType = MerchantTypeEnum.租房

            };
            iGlobalGoodsTypes.Add(s3);
            foreach (GlobalGoodsType a in iGlobalGoodsTypes)
            {
                iGlobalGoodsTypeRepository.SaveOrUpdate(a);
            }

        }
    }
}
