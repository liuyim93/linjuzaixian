using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.repositories;

namespace friday.core.services
{
    public class SystemFunctionObjectService:ISystemFunctionObjectService
    {

        SystemFunctionObjectService(IRepository<SystemFunctionObject> iSystemFunctionObjectRepository)
        {
            this.iSystemFunctionObjectRepository = iSystemFunctionObjectRepository;
            foreach (var item in this.GetType().GetProperties().Where(x => x.CanWrite))
            {
                var p = Activator.CreateInstance(item.PropertyType);
                if (p is BaseModel)
                {
                    var model = p as BaseModel;
                    model.ModelTag = item.Name;
                    item.SetValue(this, model, null);
                    this.list.Add(model);
                }

            }
        }
        private IRepository<SystemFunctionObject> iSystemFunctionObjectRepository;
        private List<BaseModel> list = new List<BaseModel>();
        internal List<BaseModel> List
        {
            get { return this.list; }
        }
        public void Generate()
        {
            var existList = iSystemFunctionObjectRepository.GetAll();
            foreach (var model in List)
            {
                var systemFunctionObject = existList.SingleOrDefault(x => x.PermissonTag == model.ModelTag);
                if (systemFunctionObject == null)
                    systemFunctionObject = new SystemFunctionObject();
                systemFunctionObject.PermissonTag = model.ModelTag;
                systemFunctionObject.FunctionObjectName = model.ModelTag;
                systemFunctionObject.Description = "自动生成";
                iSystemFunctionObjectRepository.SaveOrUpdate(systemFunctionObject);
                generateFunction(model, systemFunctionObject.Id);
            }
        }

        private void generateFunction(BaseModel model, string modelId)
        {
            var existList = iSystemFunctionObjectRepository.GetAll();
            foreach (var func in model.List)
            {
                var systemFunctionObject = existList.SingleOrDefault(x => x.PermissonTag == func.TagName);
                if (systemFunctionObject == null)
                    systemFunctionObject = new SystemFunctionObject();
                systemFunctionObject.PermissonTag = func.TagName;
                systemFunctionObject.FunctionObjectName = func.Name;
                systemFunctionObject.ParentFunctionObjectId = modelId;
                systemFunctionObject.Description = "自动生成";
                systemFunctionObject.FunctionAvailable = func.Enable;
                systemFunctionObject.DeletePermissionAvailable = func.Delete;
                systemFunctionObject.EditPermissionAvailable = func.Edit;
                iSystemFunctionObjectRepository.SaveOrUpdate(systemFunctionObject);

            }
        }

    }
}
