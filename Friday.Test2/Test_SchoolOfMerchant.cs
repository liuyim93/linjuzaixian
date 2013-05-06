using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using System.Transactions;

namespace Friday.Test2
{
      [TestFixture]
     public class Test_SchoolOfMerchant
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
          public void Test_School() 
          {
              IRepository<School> reposch = UnityHelper.UnityToT<IRepository<School>>();
              IList<School> schs=new List<School>();
      
              School sch1 = new School()
              {
                  Name = "山东财经大学",  ShortName = "山财大",  CityName = "济南市历下区"
              };
              
              schs.Add(sch1);
              School sch2 = new School()
              {
                  Name = "山东行政学院", ShortName = "山行政",   CityName = "济南市历下区"
              };
              schs.Add(sch2);
              School sch3 = new School()
              {
                  Name = "山东司法警官职业学院", ShortName = "山司警",  CityName = "济南市历下区"
              };
              schs.Add(sch3);
              School sch4 = new School()
              {
                  Name = "山东技师学院", ShortName = "山技师", CityName = "济南市历下区"
              };
              schs.Add(sch4);
              foreach(School s in schs)
              {
                  reposch.SaveOrUpdate(s);              
              }

              IRepository<Shop> reposhop = UnityHelper.UnityToT<IRepository<Shop>>();
              IList<Shop> shops = new List<Shop>();

              Shop r1 = new Shop()
              {
                  Distance = "学校租房10",
                  Address = "学校租房erhuan10",
                  Email = "学校租房ocam10@163.com",
                  EntityIndex = 10,
                  Name = "学校租房ele10",
                  Owener = "学校租房basil10",
                  Rate = 10

              };
              shops.Add(r1);

             
              Shop r2 = new Shop()
              {
                  Distance = "学校租房20",
                  Address = "学校租房erhuan20",
                  Email = "学校租房ocam20@163.com",
                  EntityIndex = 20,
                  Name = "学校租房ele20",
                  Owener = "学校租房basil20",
                  Rate = 20
              };
              shops.Add(r2);

              foreach (Shop r in shops)
              {
                  reposhop.SaveOrUpdate(r);
              }

              IRepository<SchoolOfMerchant> reposchofmer = UnityHelper.UnityToT<IRepository<SchoolOfMerchant>>();
              IList<SchoolOfMerchant> schofmers = new List<SchoolOfMerchant>();

              SchoolOfMerchant schmer1 = new SchoolOfMerchant()
              {
                  School=sch1,
                  Merchant=r1
              };
              schofmers.Add(schmer1);
              
              SchoolOfMerchant schmer2 = new SchoolOfMerchant()
              {
                  School = sch2,
                  Merchant = r1
              };
              schofmers.Add(schmer2);

              foreach (SchoolOfMerchant scm in schofmers)
              {
                  reposchofmer.SaveOrUpdate(scm);
              }

              //SchoolOfMerchant st = new SchoolOfMerchant();
              //foreach (School s in schs)
              //{
              //    st.Merchant = r1;
              //    st.School = sch1;
              //}             
              //schofmers.Add(st);


          }










    }
}
