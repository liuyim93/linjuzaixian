using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MbUnit.Framework;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;
using NHibernate.Cfg;
using friday.core;
using Iesi.Collections.Generic;
using NHibernate.Criterion;

namespace friday.coretest
{
    [TestFixture]
    public class Test_Commodity
    {
        [SetUp]
        public void init()
        {
            //HibernatingRhinos.NHibernate.Profiler.Appender.NHibernateProfiler.Initialize();
            HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
            SessionBuilder.sessionStorage = new ThreadSessionStorage();
            //Configuration cfg = new Configuration();
            //cfg.Configure();
            //SchemaExport schema = new SchemaExport(cfg);
            //schema.Drop(true, false);
            //相当于：Execute(script, export, true, true)
            //schema.SetOutputFile("log.txt");
            //schema.Create(true, false);
            //SessionBuilder.CreateSession();

        }
        [Test]
        public void test_add_restaurant_and_food()
        {
                 
                 Food f = new Food()
                 {
                     Name = "饼干",
                     Price = 20,
                     MonthAmount = 300
                 };
                 new Repository<Food>().SaveOrUpdate(f);

                 Restaurant r = new Restaurant()
                 {
                     Name = "ele",
                     Activity = "dijia",
                     Bulletins = "开业",
                     Cost = 4,
                     Distance = "15",
                     Description = "很不错"
                 };
                 r.Commodities = new HashedSet<Commodity>();
                 r.Commodities.Add(f);
                 f.Merchant = r;
                 new Repository<Restaurant>().SaveOrUpdate(r);
             
        }
        [Test]
        public void test_get_restaurant_with_food()
        {

            Food f = new Food()
            {
                Name = "饼干",
                Price = 20,
                MonthAmount = 300
            };
            new Repository<Food>().SaveOrUpdate(f);

            Restaurant r = new Restaurant()
            {
                Name = "ele",
                Activity = "dijia",
                Bulletins = "开业",
                Cost = 4,
                Distance = "15",
                Description = "很不错"
            };
            r.Commodities = new HashedSet<Commodity>();
            r.Commodities.Add(f);
            f.Merchant = r;
            new Repository<Restaurant>().SaveOrUpdate(r);
            Restaurant res = new Repository<Restaurant>().Get(r.Id);

            IList<Commodity> coms=res.Commodities.ToList();
            

            

        }
        
        [Test]
        public void get_restaurant()
        {
            #region
            /*
            SELECT this_.Merchant_id        as Id2_0_,
       this_1_.Name             as Name2_0_,
       this_1_.CreateTime       as CreateTime2_0_,
       this_1_.IsDelete         as IsDelete2_0_,
       this_1_.Version          as Version2_0_,
       this_1_.Address          as Address2_0_,
       this_1_.Description      as Descript7_2_0_,
       this_1_.Bulletins        as Bulletins2_0_,
       this_1_.Distance         as Distance2_0_,
       this_1_.Logo             as Logo2_0_,
       this_1_.ShortName        as ShortName2_0_,
       this_1_.Rate             as Rate2_0_,
       this_1_.Owener           as Owener2_0_,
       this_1_.Activity         as Activity2_0_,
       this_1_.ShopHours        as ShopHours2_0_,
       this_1_.Tel              as Tel2_0_,
       this_1_.ShopStatus       as ShopStatus2_0_,
       this_.SendTime           as SendTime3_0_,
       this_.SendPrice          as SendPrice3_0_,
       this_.Rate               as Rate3_0_,
       this_.NightStartHour     as NightSta5_3_0_,
       this_.NightEndHour       as NightEnd6_3_0_,
       this_.MorningBeginHour   as MorningB7_3_0_,
       this_.MorningEndHour     as MorningE8_3_0_,
       this_.AfternoonBeginHour as Afternoo9_3_0_,
       this_.AfternoonEndHour   as Afterno10_3_0_
FROM   [Restaurant] this_
       inner join [Merchant] this_1_
         on this_.Merchant_id = this_1_.Id
WHERE  this_1_.IsDelete = 0 /* @p0 */
             
            #endregion
            var factory = SessionBuilder.SessionFactory;
            using (var session = factory.OpenSession())
            {

                session.CreateCriteria<Restaurant>()
                .Add(Expression.Eq("IsDelete", false))
                    // .AddOrder(Order.Asc("CreateTime"))
                .List<Restaurant>();
                //session.Save(c);
                //session.Flush();

            }
        }
        [Test]
        public void get_restaurant_with_food_hql()
        {
            var factory = SessionBuilder.SessionFactory;
            using (var session = factory.OpenSession())
            {              
                //session.CreateQuery("from Restaurant r, 

            }
        }


    }
}
