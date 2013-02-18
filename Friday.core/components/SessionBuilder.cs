using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Cfg;
using NHibernate;
using FluentNHibernate.Cfg;
using System.Web;

namespace friday.core.components
{
    public static class SessionBuilder
    {
        private static object locker = new object();
        private static Configuration configuration = null;
        private static ISessionFactory sessionFactory = null;
        public static ISessionStorage sessionStorage { set; get; }
        private static void CreateConfiguration()
        {
            configuration = Fluently.Configure(
                new NHibernate.Cfg.Configuration().Configure())
                .Mappings(m => m.FluentMappings.AddFromAssembly(typeof(SessionBuilder).Assembly))
                .ExposeConfiguration(x =>
                                   {
                                       x.SetInterceptor(new SqlStatementInterceptor());
                                   })
                .BuildConfiguration();
        }
        public static Configuration Configuration
        {
            get
            {
                lock (locker)
                {
                    if (configuration == null)
                    {
                        CreateConfiguration();
                    }
                    return configuration;
                }
            }
            set { configuration = value; }
        }
        public static ISessionFactory SessionFactory
        {
            get
            {
                if (sessionFactory == null)
                {
                    if (Configuration == null)
                    {
                        CreateConfiguration();
                    }
                    lock (locker)
                    {
                        sessionFactory = Configuration.BuildSessionFactory();

                    }
                }
                return sessionFactory;
            }
        }
        public static ISession CreateSession()
        {
            ////2011-3-19 李丽 用来区别web还是job多线程
            //if (HttpContext.Current == null)
            //    sessionStorage = new TestSessionStorage();
            //else
            //    sessionStorage = new HttpSessionStorage();
            //2013-01-21 basilwang use Unityhelper
            sessionStorage=UnityHelper.UnityToT<ISessionStorage>();
            ISession s = sessionStorage.Get();
            if (s == null)
            {
                s = SessionFactory.OpenSession();
                sessionStorage.Set(s);
            }
            return s;
        }


    }
}
