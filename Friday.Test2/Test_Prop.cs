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
    public class Test_Prop
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
        public void Test_Prop_Data()
        {
            //添加规格类型
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



            //添加规格明细
            IRepository<PropValue> iPropValueRepository = UnityHelper.UnityToT<IRepository<PropValue>>();
            IList<PropValue> iPropValues = new List<PropValue>();

            //颜色明细
            PropValue ppv1_1 = new PropValue()
            {
                PropValueName="粉红", 
                IsDelete = false,
                PropID=ppt1
            };
            iPropValues.Add(ppv1_1);
            PropValue ppv1_2 = new PropValue()
            {
                PropValueName = "蓝色",
                IsDelete = false,
                PropID = ppt1
            };
            iPropValues.Add(ppv1_2);
            PropValue ppv1_3 = new PropValue()
            {
                PropValueName = "橘黄色",
                IsDelete = false,
                PropID = ppt1
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
                PropID = ppt2
            };
            iPropValues2.Add(ppv2_1);
            PropValue ppv2_2 = new PropValue()
            {
                PropValueName = "M",
                IsDelete = false,
                PropID = ppt2
            };
            iPropValues2.Add(ppv2_2);
            PropValue ppv2_3 = new PropValue()
            {
                PropValueName = "L",
                IsDelete = false,
                PropID = ppt2
            };
            iPropValues2.Add(ppv2_3);
            PropValue ppv2_4 = new PropValue()
            {
                PropValueName = "XL",
                IsDelete = false,
                PropID = ppt2
            };
            iPropValues2.Add(ppv2_4);
            foreach (PropValue a in iPropValues2)
            {
                iPropValueRepository.SaveOrUpdate(a);
            }

            //网络明细
            IList<PropValue> iPropValues3 = new List<PropValue>();
            PropValue ppv3_1 = new PropValue()
            {
                PropValueName = "联通3G",
                IsDelete = false,
                PropID = ppt3
            };
            iPropValues3.Add(ppv3_1);
            PropValue ppv3_2 = new PropValue()
            {
                PropValueName = "电信3G",
                IsDelete = false,
                PropID = ppt3
            };
            iPropValues3.Add(ppv3_2);
            PropValue ppv3_3 = new PropValue()
            {
                PropValueName = "移动3G",
                IsDelete = false,
                PropID = ppt3
            };
            iPropValues3.Add(ppv3_3);
            foreach (PropValue a in iPropValues3)
            {
                iPropValueRepository.SaveOrUpdate(a);
            }

        }

     
    }
}
