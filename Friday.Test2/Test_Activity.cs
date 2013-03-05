using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using System.Transactions;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_Activity
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
            IRepository<Activity> iActivityRepository = UnityHelper.UnityToT<IRepository<Activity>>();
            IList<Activity> iActivitys = new List<Activity>();

            Activity act1 = new Activity()
            {
                  Name="1元旦大酬宾",
                  Matters="10",
                  Description = "阿里巴巴员工2013年初收到了史上最丰厚的年终大礼包。", 
                  Image="Pic/images.jpg"

            };
            iActivitys.Add(act1);
            Activity act2 = new Activity()
            {
                Name = "2元旦大酬宾",
                Matters = "10",
                Description = "阿里巴巴员工2013年初收到了史上最丰厚的年终大礼包。",
                Image = "Pic/images.jpg"
            };
            iActivitys.Add(act2);
            Activity act3 = new Activity()
            {
                Name = "3元旦大酬宾",
                Matters = "10",
                Description = "阿里巴巴员工2013年初收到了史上最丰厚的年终大礼包。",
                Image = "Pic/images.jpg"

            };
            iActivitys.Add(act3);
            foreach (Activity a in iActivitys)
            {
                iActivityRepository.SaveOrUpdate(a);
            }

        }

     
    }
}
