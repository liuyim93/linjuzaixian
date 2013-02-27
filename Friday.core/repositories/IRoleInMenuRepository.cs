using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.repositories
{
    public interface IRoleInMenuRepository : IRepository<RoleInMenu>    
    {
        bool GetRoleInMenuByMenuIDandRoleID(string menuid, string roleid);
        IList<RoleInMenu> GetSystemMenuPListByRoleID(string RoleID);
    }
}
