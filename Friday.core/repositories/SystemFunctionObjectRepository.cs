using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Linq;

namespace friday.core.repositories
{
    public class SystemFunctionObjectRepository : Repository<SystemFunctionObject>, ISystemFunctionObjectRepository
    {
        public IList<SystemFunctionObject> GetChildrenFromParentID(string ParentID)
        {
            var list = (from x in this.Session.Query<SystemFunctionObject>() select x).Where(o => o.ParentFunctionObjectId == ParentID && o.IsDelete == false).ToList();
            return list;
        }
        public bool IsHaveChild(SystemFunctionObject systemFunctionObject)
        {
            var isHaveChild = (from x in this.Session.Query<SystemFunctionObject>() select x).Where(o => o.ParentFunctionObjectId == systemFunctionObject.Id && o.IsDelete == false).Count() > 0 ? true : false;
            return isHaveChild;
        }
    }
}
