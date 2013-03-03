using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.services
{
    public interface ISystemMenuService
    {
        SystemMenu Load(string id);
        void Save(SystemMenu systemMenu);
        void Update(SystemMenu systemMenu);
        void Delete(string id);
        IList<SystemMenu> GetChildrenFromParentID(string ParentID);
        bool IsHaveChild(SystemMenu systemMenu);
        IList<SystemMenu> GetMenuByUserIDAndParentID(string userid, string parentid);
    }
}
