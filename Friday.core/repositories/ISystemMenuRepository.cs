using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.repositories
{
    public interface ISystemMenuRepository : IRepository<SystemMenu>
    {
        IList<SystemMenu> GetChildrenFromParentID(string ParentID);
        bool IsHaveChild(SystemMenu systemMenu);

    }
}
