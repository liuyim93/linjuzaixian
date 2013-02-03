using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Gallio.Framework;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;

namespace Friday.Test2
{
      [TestFixture]
     public class Test_SchoolOfMerchant
    {
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

              IRepository<Rent> reporent = UnityHelper.UnityToT<IRepository<Rent>>();
              IList<Rent> rents = new List<Rent>();

              Rent r1 = new Rent()
              {
                  Distance = "学校租房10",
                  Address = "学校租房erhuan10",
                  Email = "学校租房ocam10@163.com",
                  EntityIndex = 10,
                  Name = "学校租房ele10",
                  Owener = "学校租房basil10",
                  Rate = 10

              };
              rents.Add(r1);

             
              Rent r2 = new Rent()
              {
                  Distance = "学校租房20",
                  Address = "学校租房erhuan20",
                  Email = "学校租房ocam20@163.com",
                  EntityIndex = 20,
                  Name = "学校租房ele20",
                  Owener = "学校租房basil20",
                  Rate = 20
              };
              rents.Add(r2);

              foreach (Rent r in rents)
              {
                  reporent.SaveOrUpdate(r);
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
