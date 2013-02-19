using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.EnumType;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_GlobalGoodsType
    {
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
