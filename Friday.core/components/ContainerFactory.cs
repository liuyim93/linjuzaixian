using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.Unity.Configuration;
using System.Configuration;
using Microsoft.Practices.Unity;
using NHibernate.Cache;
using System.Web;
using System.Web.Caching;
using System.IO;
using UnityConfiguration;

namespace friday.core.components
{
    public static class ContainerFactory
    {
        static object _lock = new Object();
        private static IUnityContainer container;
        public static IUnityContainer GetContainer()
        {

            if (container == null)
            {
                lock (_lock)
                {
                    if (container == null)
                    {
                        IUnityContainer Container = new UnityContainer();
                        Container.RegisterType<ICache, WebCache>(new ContainerControlledLifetimeManager());
                        UnityRegistry x = new UnityRegistry();
                        x.AddRegistry<FooRegistry>();

                        //ExeConfigurationFileMap infraFileMap = new ExeConfigurationFileMap();
                        //if(HttpContext.Current!=null)
                        //infraFileMap.ExeConfigFilename = HttpContext.Current.Server.MapPath("~/unity.di.infrastructure.config");
                        //else
                        //    infraFileMap.ExeConfigFilename = AppDomain.CurrentDomain.BaseDirectory + "unity.di.infrastructure.config";

                        //UnityConfigurationSection infraConfig = (UnityConfigurationSection)ConfigurationManager
                        //    .OpenMappedExeConfiguration(infraFileMap, ConfigurationUserLevel.None)
                        //    .GetSection("unity");
                        //if (infraConfig.Containers.Default != null)
                        //{
                        //    infraConfig.Containers.Default.Configure(Container);
                        //}

                        ////上面是上篇讲的DI依赖注入XML文件的读取，下面是本篇讲的AOP的XML文件读取
                        //ExeConfigurationFileMap infraAopFileMap = new ExeConfigurationFileMap();
                        //if (HttpContext.Current != null)
                        //    infraAopFileMap.ExeConfigFilename = HttpContext.Current.Server.MapPath("~/unity.aop.infrastructure.config");
                        //else
                        //    infraAopFileMap.ExeConfigFilename = AppDomain.CurrentDomain.BaseDirectory + "unity.aop.infrastructure.config";


                        //UnityConfigurationSection infraAopConfig = (UnityConfigurationSection)ConfigurationManager
                        //    .OpenMappedExeConfiguration(infraAopFileMap, ConfigurationUserLevel.None)
                        //    .GetSection("unity");
                        //if (infraAopConfig.Containers.Default != null)
                        //{
                        //    infraAopConfig.Containers.Default.Configure(Container);
                        //}
                        container = Container;
                    }
                }
                //HttpContext.Current.Application.Add("container", Container);



            }
            return container;
        }

    }
}
