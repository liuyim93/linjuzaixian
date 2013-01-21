using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityConfiguration;
using Microsoft.Practices.Unity;
using friday.core.repositories;
using friday.core.domain;
using friday.core.utils;
namespace friday.core.components
{
    public class FooRegistry : UnityRegistry
    {
        public FooRegistry()
       {
         // Scan one or several assemblies and auto register types based on a
         // convention. You can also include or exclude certain types and/or
         // namespaces using a filter.
         Scan(scan =>
         {
           scan.AssemblyContaining<FooRegistry>();
           scan.ForRegistries();
           scan.WithNamingConvention();
           //scan.With<AddAllConvention>().TypesImplementing<IAutoUnity>().Using<ContainerControlledLifetimeManager>();
           scan.With<FirstInterfaceSingletonConvention>();
           //scan.With<SetAllPropertiesConvention>().OfType<ILogger>();
           //scan.With<AddAllConvention>().Using<ContainerControlledLifetimeManager>();
           scan.ExcludeType<WebCache>();
           //2013-01-21 basilwang must exclude all subclass of the ISessionStorage, otherwise the subclass of ISessionStorge which will not be 
           //Exclued will become singeton and  replace the http context lifetime SessionStorage registerd before 
           scan.ExcludeType<TestSessionStorage>();
           scan.ExcludeType<ThreadSessionStorage>();
           scan.ExcludeType<HttpSessionStorage>();
           scan.ExcludeType<AutoSessionStorage>();
           scan.ExcludeType<Logger>();
           scan.ExcludeType<MockLogger>();
           
           
           
         });
         
         //this.Configure<ISystemUserRepository>().AsSingleton();
         
         // Manually register a service
         //Register<IFooService, FooService>().WithName("Foo").AsSingleton();
 
         // Make services a singleton
         //MakeSingleton<ISingletonService>();
         // You can automatically configure the container to call
         // a method on any service when they are created
         //AfterBuildingUp<IStartable>().Call((c, s) => s.Start();
 
         // You can automatically configure the container to
         // decorate services when they are created
         //AfterBuildingUp<IFooService>().DecorateWith((c, t) => new FooDecorator(t));
 
         // If you want to inject values or objects that are not registered in
         // the container, you can do so by adding them using this statement.
         // For instances you want the container to create, just specify the type.
         //ConfigureCtorArgsFor<ServiceWithCtorArgs>("some string", typeof (IFooService));
 
         // Unity follows the greedy constructor pattern when creating instances.
         // If you want to use a different constructor, you specify it by listing
         // the types of the arguments in the constructor you want it to use.
         //SelectConstructor<ServiceWithCtorArgs>(typeof (IFooService));
       }
    }
}
