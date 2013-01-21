using System;
using System.Web.Mvc;
using Microsoft.Practices.Unity;

namespace friday.mvc
{
    public class ModelBinder : DefaultModelBinder
    {

        private readonly IUnityContainer container;
        private readonly ModelMetadataProvider provider;

        public ModelBinder(IUnityContainer container)
            : this(container, null)
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        /// <param name="provider">If null, a new DataAnnotationsModelMetadataProvider is used.</param>
        public ModelBinder(IUnityContainer container, ModelMetadataProvider provider)
        {
            if (container == null) throw new ArgumentNullException("container");

            this.container = container;
            this.provider = provider ?? new DataAnnotationsModelMetadataProvider();
        }


        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            if (bindingContext.ModelType.IsInterface)
            {
                var model = container.Resolve(bindingContext.ModelType);

                if (model != null)
                {
                    var containerType = bindingContext.ModelMetadata.ContainerType;
                    var propertyName = bindingContext.ModelMetadata.PropertyName;
                    var metaData = new ModelMetadata(provider, containerType, null, model.GetType(),
                                                     propertyName) { Model = model };
                    bindingContext.ModelMetadata = metaData;
                }
            }

            return base.BindModel(controllerContext, bindingContext);
        }

    }
}
