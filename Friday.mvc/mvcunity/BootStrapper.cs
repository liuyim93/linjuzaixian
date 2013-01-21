using System.Web.Mvc;
using Microsoft.Practices.Unity;
using System.Reflection;
using System.Configuration;
using Microsoft.Practices.Unity.Configuration;

namespace friday.mvc
{
    public static class Bootstrapper
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        /// <param name="configFileName"></param>
        /// <param name="containerName"></param>
        public static void LoadConfig(IUnityContainer container, string configFileName = "", string containerName = "")
        {
            UnityConfigurationSection unitySection;
            if (!string.IsNullOrWhiteSpace(configFileName))
            {
                var fileMap = new ExeConfigurationFileMap { ExeConfigFilename = configFileName };
                var config = ConfigurationManager.OpenMappedExeConfiguration(fileMap, ConfigurationUserLevel.None);
                unitySection = (UnityConfigurationSection)config.GetSection("unity");
            }
            else
            {
                unitySection = (UnityConfigurationSection)ConfigurationManager.GetSection("unity");
            }

            if (!string.IsNullOrWhiteSpace(containerName))
                unitySection.Containers[containerName].Configure(container);
            else
                unitySection.Configure(container);
            //unitySection.Containers["Default"].Configure(container);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        public static void Run(IUnityContainer container)
        {
            SetDefaultBinder(container);
            var factory = new ControllerFactory(container);
            SetControllerFactory(factory);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        /// <param name="configSectionName"></param>
        /// <param name="containerName"></param>
        /// <param name="assembly"></param>
        public static void Run(IUnityContainer container, Assembly assembly, string configFileName = "", string containerName = "", bool injectActionMethods = true)
        {
            if (injectActionMethods)
                SetDefaultBinder(container);

            if (!string.IsNullOrWhiteSpace(containerName))
                LoadConfig(container, configFileName, containerName);

            var factory = new ControllerFactory(container, assembly);
            SetControllerFactory(factory);
        }


        #region Private Methods

        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        private static void SetDefaultBinder(IUnityContainer container)
        {
            ModelBinders.Binders.DefaultBinder = new ModelBinder(container);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="factory"></param>
        private static void SetControllerFactory(IControllerFactory factory)
        {
            ControllerBuilder.Current.SetControllerFactory(factory);
        }

        #endregion

    }
}
