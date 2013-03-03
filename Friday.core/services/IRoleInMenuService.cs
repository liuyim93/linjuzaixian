using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.services
{
    public interface IRoleInMenuService
    {
        RoleInMenu Load(string id);
        void Save(RoleInMenu roleInMenu);
        void Update(RoleInMenu roleInMenu);
        void Delete(string id);
        bool GetRoleInMenuByMenuIDandRoleID(string menuid, string roleid);
        IList<RoleInMenu> GetSystemMenuPListByRoleID(string RoleID);
    }
}
