using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Linq;

namespace friday.core.repositories
{
    public class SystemMenuRepository:Repository<SystemMenu>,ISystemMenuRepository
    {
        public IList<SystemMenu> GetChildrenFromParentID(string ParentID)
        {
            var list = (from x in this.Session.Query<SystemMenu>() select x).Where(o => o.ParentID == ParentID && o.IsDelete==false).ToList();
            return list;
        }

        public bool IsHaveChild(SystemMenu systemMenu)
        {
            var isHaveChild = (from x in this.Session.Query<SystemMenu>() select x).Where(o => o.ParentID == systemMenu.Id && o.IsDelete==false).Count() > 0 ? true : false;
            return isHaveChild;
        }
        public IList<SystemMenu> GetMenuByUserIDAndParentID(string userid, string parentid)
        {
//            return Session.CreateQuery(@"select distinct new SystemMenu(u.Id,u.Name,u.TreeCode,u.Leaf,u.ParentID,u.TLevel,u.MenuImage,u.ColIndex,u.Remarks,r.UrlPath,r.UrlRel,u.IfiFrame)
//                                            from RoleInMenu rm
//                                            left join  rm.Role ro
//                                            left join  ro.SystemUsers ur
//                                            left join  rm.Menu u
//                                            left join  u.SystemUrl r  
//                                          where ur.Id=:userID
//                                            and u.ParentID=:ParentID 
//                                            and u.IsDelete=:isdelete
//                                            order by u.ColIndex asc")
//                 .SetString("userID", userID)
//                 .SetString("ParentID", parentID)
//                 .SetBoolean("isdelete", false)
//                 .List<SystemMenu>();

            var menuList = (from user in this.Session.Query<LoginUser>()
                            where user.Id == userid
                            from roles in user.UserInRoles
                            from roleinmenus in roles.Role.RoleInMenus
                            select roleinmenus
                            ).Select(o=>o.Menu).Where(o=>o.ParentID==parentid).ToList();
            return menuList;
        }


    }
}
