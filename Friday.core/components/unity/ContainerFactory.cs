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
                        /*2013-02-27 basilwang I think there exists a but                    
                         * based on this article  Microsoft Enterprise Library 5.0 Beta1 Change Log                        
                         * http://entlib.codeplex.com/wikipage?title=EntLib5Beta1ChangeLog#daab                        
                         * ....When using the Unity integration, in previous versions you had to add the core Enterprise Library container extension                   
                         * and an extension per block. Now only the core extension is needed, the rest of the blocks are supported automatically.
                         * The old extensions remain in the code solely for backwards compatibility. They now have no function.
                         * ....
                         * 
                         * but we have to add DataAccessBlockExtension, otherwise, The error message which the type Database does not have an accessible constructor will be shown
                         */
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
