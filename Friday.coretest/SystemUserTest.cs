using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using friday.coretest;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;

namespace weat.coretest
{
    [TestFixture]
    class SystemUserTest
    {
        [SetUp]
        public void init()
        {
            HibernatingRhinos.NHibernate.Profiler.Appender.NHibernateProfiler.Initialize();

            SessionBuilder.sessionStorage = new TestSessionStorage();
            //Configuration cfg = new Configuration();
            //cfg.Configure();
            //SchemaExport schema = new SchemaExport(cfg);
            //schema.Drop(true, false);
            //相当于：Execute(script, export, true, true)
            //schema.SetOutputFile("log.txt");
            //schema.Create(true, false);

        }

        [Test]
        public void test_add_a_user()
        {
            SystemUser u = new SystemUser()
            {
                Name = "basil",
                Password = "123456",
                Tel = "1342343214",
                Email = "ocam@163.com",
                Description = "a lot of things"



            };
            new Repository<SystemUser>().SaveOrUpdate(u);

        }
    }
}
