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
    public class Test_PropID
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
        public void Test()
        {
            IRepository<PropID> iPropIDRepository = UnityHelper.UnityToT<IRepository<PropID>>();
            IList<PropID> iPropIDs = new List<PropID>();

            PropID ppt1 = new PropID()
            {
                //Id = 1627207,
                PropIDName = "颜色",
                IsDelete = false
            };
            iPropIDs.Add(ppt1);
            PropID ppt2 = new PropID()
            {
                //Id = 21921,
                PropIDName = "尺寸",
                IsDelete = false
            };
            iPropIDs.Add(ppt2);
            PropID ppt3 = new PropID()
            {
                //Id = 10004,
                PropIDName = "网络类型",
                IsDelete = false
            };
            iPropIDs.Add(ppt3);
            foreach (PropID a in iPropIDs)
            {
                iPropIDRepository.SaveOrUpdate(a);
            }          
        }

     
    }
}
