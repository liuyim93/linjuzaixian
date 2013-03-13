using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.repositories
{
    public interface ISystemFunctionObjectRepository : IRepository<SystemFunctionObject>
    {

        IList<SystemFunctionObject> GetChildrenFromParentID(string ParentID);
        SystemFunctionObject GetSystemFunctionObjectByName(string name);
        bool IsHaveChild(SystemFunctionObject systemFunctionObject);
        IList<SystemFunctionObject> Search(List<DataFilter> termList);
        IList<SystemFunctionObject> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
