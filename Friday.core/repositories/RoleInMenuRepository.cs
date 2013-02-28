using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Linq;

namespace friday.core.repositories
{
    public class RoleInMenuRepository : Repository<RoleInMenu>, IRoleInMenuRepository
    {
        public bool GetRoleInMenuByMenuIDandRoleID(string menuid, string roleid)
        {
//            var query = Session.CreateQuery(@"select ur from RoleInMenu ur 
//                                                    left join fetch ur.SystemMenu u 
//                                                    left join fetch ur.SystemRole r 
//                                                where ur.SystemMenu=:MenuID and ur.SystemRole=:RoleID")
//                         .SetString("MenuID", menuid).SetString("RoleID", roleid)
//                         .List<RoleInMenu>().ToList<RoleInMenu>();

            var query = (from roleinmenus in this.Session.Query<RoleInMenu>()
                         where roleinmenus.SystemMenu.Id==menuid && roleinmenus.SystemRole.Id==roleid && roleinmenus.IsDelete==false
                         select roleinmenus
                            ).LongCount();

            return ((query > 0) ? true : false);

        }
        //根据角色找出菜单
        public IList<RoleInMenu> GetSystemMenuPListByRoleID(string RoleID)
        {

//            var query = Session.CreateQuery(@"select c from RoleInMenu c 
//                                                   left join fetch c.SystemRole as r  where
//                                             c.SystemRole=:RoleID").SetString("RoleID", RoleID);
            var query = ( from systemrole in this.Session.Query<SystemRole>()
                          where systemrole.Id==RoleID && systemrole.IsDelete==false
                          from roleinmenus in systemrole.RoleInMenus
                          where roleinmenus.IsDelete==false
                          select roleinmenus    
                              ).ToList();

            return query;
        }
 
    }
}
