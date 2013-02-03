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
          
          }










    }
}
