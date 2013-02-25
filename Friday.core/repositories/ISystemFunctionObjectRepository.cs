using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.repositories
{
    public interface ISystemFunctionObjectRepository : IRepository<SystemFunctionObject>
    {

        IList<SystemFunctionObject> GetChildrenFromParentID(string ParentID);

        bool IsHaveChild(SystemFunctionObject systemFunctionObject);
    }
}
