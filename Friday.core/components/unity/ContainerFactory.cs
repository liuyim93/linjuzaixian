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
using friday.core.utils;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.Unity;
using Microsoft.Practices.EnterpriseLibrary.Logging.Configuration.Unity;
using Microsoft.Practices.EnterpriseLibrary.Data.Configuration.Unity;

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
                        Container.RegisterType<ILogger, Logger>(new ContainerControlledLifetimeManager());
                        //2013-02-27 basilwang add EnterpriseLibraryCoreExtension
                        Container.AddNewExtension<EnterpriseLibraryCoreExtension>();
                        Container.AddNewExtension<LoggingBlockExtension>();
                        Container.AddNewExtension<DataAccessBlockExtension>();
 
                        ExeConfigurationFileMap infraFileMap = new ExeConfigurationFileMap();
                        if (HttpContext.Current != null)
                        {
                            infraFileMap.ExeConfigFilename = HttpContext.Current.Server.MapPath("~/unity.di.infrastructure.config");
                            Container.RegisterType<ISessionStorage, AutoSessionStorage>(new HttpContextLifetimeManager());
                        }
                        else
                        {
                            infraFileMap.ExeConfigFilename = AppDomain.CurrentDomain.BaseDirectory + "\\unity.di.infrastructure.config";
                            Container.RegisterType<ISessionStorage, AutoSessionStorage>(new PerThreadLifetimeManager());
                        }

                        UnityConfigurationSection infraConfig = (UnityConfigurationSection)ConfigurationManager
                            .OpenMappedExeConfiguration(infraFileMap, ConfigurationUserLevel.None)
                            .GetSection("unity");
                        infraConfig.Configure(Container);
                                               
                        
                        Container.Configure(x =>
                        {
                            x.AddRegistry<FooRegistry>();
                           
  
                        });
                        //UnityRegistry x = new UnityRegistry();
                        //x.AddRegistry<FooRegistry>();
                        //x.Configure(Container);
                        
                        container = Container;
                    }
                }
                //HttpContext.Current.Application.Add("container", Container);



            }
            return container;
        }

    }
}
