using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
 
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;
using friday.core.components;


namespace friday.core
{
    public static class UnityHelper
    {
        public static T UnityToT<T>(string name)
        {
            IUnityContainer container = CreateContainer();
            T model = container.Resolve<T>(name);
            return model;
        }
        public static T UnityToT<T>()
        {
            IUnityContainer container = CreateContainer();
            T model = container.Resolve<T>();
            return model;
        }
        public static IUnityContainer CreateContainer()
        {
            IUnityContainer container = ContainerFactory.GetContainer();
            //IUnityContainer container = new UnityContainer();
            //UnityConfigurationSection section = (UnityConfigurationSection)
            //    System.Configuration.ConfigurationManager.GetSection("unity");
            //section.Containers["container1"].Configure(container);
            return container;
        }
    }
}
