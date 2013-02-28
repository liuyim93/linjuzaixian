using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.repositories
{
    public class RoleInMenuRepository : Repository<RoleInMenu>, IRoleInMenuRepository
    {
        public bool GetRoleInMenuByMenuIDandRoleID(string menuid, string roleid)
        {
            var query = Session.CreateQuery(@"select ur from RoleInMenu ur 
                                                    left join fetch ur.SystemMenu u 
                                                    left join fetch ur.SystemRole r 
                                                where ur.SystemMenu=:MenuID and ur.SystemRole=:RoleID")
                         .SetString("MenuID", menuid).SetString("RoleID", roleid)
                         .List<RoleInMenu>().ToList<RoleInMenu>();
            return ((query.Count > 0) ? true : false);

        }
        //根据角色找出菜单
        public IList<RoleInMenu> GetSystemMenuPListByRoleID(string RoleID)
        {

            var query = Session.CreateQuery(@"select c from RoleInMenu c 
                                                   left join fetch c.SystemRole as r  where
                                             c.SystemRole=:RoleID").SetString("RoleID", RoleID);

            return query.List<RoleInMenu>();
        }
 
    }
}
