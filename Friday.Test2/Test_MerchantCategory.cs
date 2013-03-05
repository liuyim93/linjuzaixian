using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.EnumType;
using System.Transactions;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_MerchantCategory
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
        public void AddMerchantCategory()
        {
            IRepository<MerchantCategory> iMerchantCategoryRepository = UnityHelper.UnityToT<IRepository<MerchantCategory>>();
            IList<MerchantCategory> iMerchantCategorys = new List<MerchantCategory>();

            MerchantCategory s1 = new MerchantCategory()
            {
                MerchantCategoryName = "服装",
                MerchantType = MerchantTypeEnum.百货

            };
            iMerchantCategorys.Add(s1);
            MerchantCategory s2 = new MerchantCategory()
            {
                MerchantCategoryName = "中餐",
                MerchantType = MerchantTypeEnum.餐馆
            };
            iMerchantCategorys.Add(s2);
            MerchantCategory s3 = new MerchantCategory()
            {
                MerchantCategoryName = "二手",
                MerchantType = MerchantTypeEnum.租房

            };
            iMerchantCategorys.Add(s3);
            foreach (MerchantCategory a in iMerchantCategorys)
            {
                iMerchantCategoryRepository.SaveOrUpdate(a);
            }

        }
    }
}
