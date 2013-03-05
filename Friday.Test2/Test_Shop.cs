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
    public class Test_Shop
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

    }
}
