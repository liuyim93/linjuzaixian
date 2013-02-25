using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public class BaseModel
    {
        private List<FunctionTag> list = new List<FunctionTag>();
        internal List<FunctionTag> List
        {
            get { return this.list; }
        }
        private string modelTag;
        internal string ModelTag
        {
            set
            {
                foreach (var item in this.list)
                {
                    item.ParentTag = value;
                }
                modelTag = value;
            }
            get
            {
                return modelTag;
            }
        }
        internal BaseModel()
        {
            foreach (var item in this.GetType().GetProperties().Where(x => x.PropertyType == typeof(FunctionTag)))
            {
                var attr = item.GetCustomAttributes(typeof(PermissionSettingAttribute), false).FirstOrDefault();
                if (attr != null)
                {
                    var tag = (attr as PermissionSettingAttribute).Tag;
                    tag.TagName = item.Name;
                    item.SetValue(this, tag, null);
                    this.list.Add(tag);
                }

            }
        }
    }
}
