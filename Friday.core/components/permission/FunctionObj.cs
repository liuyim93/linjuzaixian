using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public partial class FunctionObj
    {
        private static FunctionObj current = null;
        public static FunctionObj Current
        {
            get
            {
                if (current == null)
                {
                    current = new FunctionObj();
                }
                return current;
            }
        }
        public static void Generate()
        {
            var existList = System_FunctionObject.List().ToList();
            foreach (var model in Current.List)
            {
                var dbModel = existList.SingleOrDefault(x => x.PermissonTag == model.ModelTag);
                if (dbModel == null)
                    dbModel = new System_FunctionObject();
                dbModel.PermissonTag = model.ModelTag;
                dbModel.FunctionObjectName = model.ModelTag;
                dbModel.Description = "自动生成";
                dbModel.CreateOrUpdate();
                generateFunction(model, dbModel.ID);
            }
        }

        private static void generateFunction(BaseModel model, int modelId)
        {
            var existList = System_FunctionObject.List().ToList();
            foreach (var func in model.List)
            {
                var dbModel = existList.SingleOrDefault(x => x.PermissonTag == func.TagName);
                if (dbModel == null)
                    dbModel = new System_FunctionObject();
                dbModel.PermissonTag = func.TagName;
                dbModel.FunctionObjectName = func.Name;
                dbModel.ParentFunctionObjectId = modelId;
                dbModel.Description = "自动生成";
                dbModel.FunctionAvailable = func.Enable;
                dbModel.DeletePermissionAvailable = func.Delete;
                dbModel.EditPermissionAvailable = func.Edit;
                dbModel.CreateOrUpdate();

            }
        }
        private List<BaseModel> list = new List<BaseModel>();
        internal List<BaseModel> List
        {
            get { return this.list; }
        }

        FunctionObj()
        {

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

    }
}
