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
                                                    left join fetch ur.Menu u 
                                                    left join fetch ur.Role r 
                                                where ur.Menu=:MenuID and ur.Role=:RoleID")
                         .SetString("MenuID", menuid).SetString("RoleID", roleid)
                         .List<RoleInMenu>().ToList<RoleInMenu>();
            return ((query.Count > 0) ? true : false);

        }
        //根据角色找出菜单
        public IList<RoleInMenu> GetSystemMenuPListByRoleID(string RoleID)
        {

            var query = Session.CreateQuery(@"select c from RoleInMenu c 
                                                   left join fetch c.Role as r  where
                                             c.Role=:RoleID").SetString("RoleID", RoleID);
            //.SetFirstResult(start)
            //.SetMaxResults(limit);
            //total = Session.CreateQuery(@"select count(distinct u) from SystemUserRole as u")
            // .UniqueResult<long>();

            return query.List<RoleInMenu>();
        }
 
    }
}
