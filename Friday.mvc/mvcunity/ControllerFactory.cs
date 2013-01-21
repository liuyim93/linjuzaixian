using System;
using System.Linq;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;
using System.Configuration;
using System.Reflection;
using System.Web.Routing;

namespace friday.mvc
{
    internal class ControllerFactory : DefaultControllerFactory
    {

        private readonly IUnityContainer container;
        private static Assembly callingAssembly;

        // The constructor:
        // 1. Sets up a new IoC container
        // 2. Registers all components specified in web.config
        // 3. Registers all controller types
        internal ControllerFactory(IUnityContainer container, Assembly assembly)
        {
            if (container == null) throw new ArgumentNullException("container");
            if (assembly == null) throw new ArgumentNullException("assembly");

            this.container = container;
            callingAssembly = assembly;
            RegisterControllers(container);
        }

        internal ControllerFactory(IUnityContainer container)
        {
            if (container == null) throw new ArgumentNullException("container");
            this.container = container;
            RegisterControllers(container);
        }


        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            try
            {
                if (controllerType == null)
                    throw new ArgumentNullException("controllerType");

                if (!typeof(IController).IsAssignableFrom(controllerType))
                    throw new ArgumentException(string.Format(
                        "Type requested is not a controller: {0}",
                        controllerType.Name),
                        "controllerType");

                return container.Resolve(controllerType) as IController;
            }
            catch
            {
                return null;
            }

        }


        #region Private Methods

        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        private static void RegisterControllers(IUnityContainer container)
        {
            // Also register all the controller types as transient
            Type[] types;
            if (callingAssembly != null)
                types = callingAssembly.GetTypes();
            else
                types = Assembly.GetExecutingAssembly().GetTypes();

            var controllerTypes = types.Where(t => typeof(IController).IsAssignableFrom(t));

            foreach (var t in controllerTypes)
                container.RegisterType(t, new TransientLifetimeManager());
        }

        #endregion

    }
}
