using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Cfg;
using FluentNHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using MbUnit.Framework;
using friday.core.components;


namespace friday.coretest
{
    [TestFixture]
    public class SystemTest
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
        public void testAdd()
        {
            Configuration cfg = Fluently.Configure(
                new NHibernate.Cfg.Configuration().Configure())
                .Mappings(m => m.FluentMappings.AddFromAssembly(typeof(SessionBuilder).Assembly)
                .ExportTo("C:\\Path")).BuildConfiguration();
            cfg.Configure();
            SchemaExport schema = new SchemaExport(cfg);

            schema.Drop(true, false);
            //相当于：Execute(script, export, true, true)
            schema.SetOutputFile("log.txt");
            //创建数据库架构
            schema.Create(true, true);
            //删除数据库架构
            //new SchemaExport(cfg).Drop(false, true);
        }

        //2010-12-9尹福青修改,在Oracle中利用此测试用例,当对一个表添加字段时，
        //只要此表为空，即可更新上列名,假如修改字段名称，最好先删掉此表再运行此Test，
        //但当此表有数据时，运行此Test不会更新此表。
        //此测试用例不会冲掉数据库其他表数据
        [Test]
        public void testUpdate()
        {   
            Configuration cfg = Fluently.Configure(
                new NHibernate.Cfg.Configuration().Configure())
                .Mappings(m => m.FluentMappings.AddFromAssembly(typeof(SessionBuilder).Assembly)
                .ExportTo("C:\\Path")).BuildConfiguration();
            cfg.Configure();
            SchemaUpdate schema = new SchemaUpdate(cfg);
            //schema.Drop(true, false);
            //相当于：Execute(script, export, true, true)
            //schema.SetOutputFile("log.txt");
            //创建数据库架构
            schema.Execute(true, true);
            //删除数据库架构
            //new SchemaExport(cfg).Drop(false, true);
        }
       
        // [Test]
        //public void SystemUserTest()
        //{

        //     var factory = SessionBuilder.SessionFactory;
        //     using (var session = factory.OpenSession())
        //     {
        //         SystemCompany c = new SystemCompany();
        //         //IRepository<SystemCompany> r=new Repository<SystemCompany>();
        //         c.CompanyName = "sdie";

        //         session.Save(c);
        //         session.Flush();

        //     }
        //}
         
        //[Test]
        // public void SystemUserTest1()
        // {

            
        //         SystemCompany c = new SystemCompany();
        //         IRepository<SystemCompany> r=new Repository<SystemCompany>();
        //         c.CompanyName = "sdie1";
        //         r.SaveOrUpdate(c);
                
        // }

    }
}
