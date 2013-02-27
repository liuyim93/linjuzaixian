using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Linq;

namespace friday.core.repositories
{
    public class SystemMenuRepository:TreeNodeRepository<SystemMenu>,ISystemMenuRepository
    {
        public IList<SystemMenu> GetChildrenFromParentID(string ParentID)
        {
            var list = (from x in this.Session.Query<SystemMenu>() select x).Where(o => o.ParentID == ParentID).ToList();
            return list;
        }

        public bool IsHaveChild(SystemMenu systemMenu)
        {
            var isHaveChild = (from x in this.Session.Query<SystemMenu>() select x).Where(o => o.ParentID == systemMenu.Id).Count() > 0 ? true : false;
            return isHaveChild;
        }

        public SystemMenu GetSystemMenuByMenuID(string MenuID)
        {
            //return Session.CreateQuery(@"select u from SystemMenu as u where u.TreeCode=:MenuID")
            //                .SetString("MenuID", MenuID)
            //                .UniqueResult<SystemMenu>();
            //2010-12-26尹福青修改获取UrlPath
            return Session.CreateQuery(@"select u from SystemMenu as u where u.TreeCode=:MenuID")
                            .SetString("MenuID", MenuID)
                            .UniqueResult<SystemMenu>();
        }

        public string GetIDByTreeCode(string TreeCode)
        {
            return Session.CreateQuery(@"select u from SystemMenu as u where u.TreeCode=:TreeCodeId")
                         .SetString("TreeCodeId", TreeCode).UniqueResult<SystemMenu>().Id.ToString();

        }
        
        public string GetCodeByParentCode(string ParentID)
        {
            var query = Session.CreateQuery(@"select max(substring(p.TreeCode,length(TreeCode)-1,2)) from SystemMenu as p where p.ParentID =:ParentCode ")
                  .SetString("ParentCode", ParentID)
                  .UniqueResult<string>();
            if (query == null)
            {
                return ParentID + "01";
            }
            else
            {
                return ParentID + string.Format("{0:D2}", (Convert.ToInt32(query) + 1));
            }
        }

        public string GetColIndexByParentCode(string ParentID)
        {
            var query = Session.CreateQuery(@"select max(substring(p.TreeCode,length(TreeCode)-1,2)) from SystemMenu as p where p.ParentID =:ParentCode ")
                  .SetString("ParentCode", ParentID)
                  .UniqueResult<string>();
            if (query == null)
            {
                return "1";
            }
            else
            {
                return (Convert.ToInt32(query) + 1).ToString();
            }
        }
        
        public IList<SystemMenu> GetMenuByUserIDandCompanyID(string userID, string companyID)
        {

//            return Session.CreateQuery(@"select new SystemMenu(u.Id,u.Name,u.TreeCode,u.Leaf,u.ParentID,u.TLevel,u.MenuImage,u.ColIndex,u.Remarks,r.UrlPath,r.UrlRel,u.IfiFrame) from SystemMenu as u,SystemUrl as r  where  u.SystemUrl=r.Id and u.Id in(select d.Menu from RoleInMenu as d 
//                                        where d.Role in(select n.Role from UserInRole as n where n.User=:userID and n.CompanyID=:CompanyID)) and u.IsDelete=:isdelete")
//                               .SetString("userID", userID).SetString("CompanyID", companyID).SetBoolean("isdelete", false)
//                               .List<SystemMenu>().ToList<SystemMenu>();

            return Session.CreateQuery(@"select new SystemMenu(u.Id,u.Name,u.TreeCode,u.Leaf,u.ParentID,u.TLevel,u.MenuImage,u.ColIndex,u.Remarks,r.UrlPath,r.UrlRel,u.IfiFrame)
                                            from RoleInMenu rm
                                            left join  rm.Role ro
                                            left join  ro.UserRoles ur
                                            left join  rm.Menu u
                                            left join  u.SystemUrl r  
                                        where ur.User=:userID and ur.CompanyID=:CompanyID and u.IsDelete=:isdelete")
                              .SetString("userID", userID).SetString("CompanyID", companyID).SetBoolean("isdelete", false)
                              .List<SystemMenu>();

        }
        public IList<SystemMenu> GetMenuByUserIDAndParentID(string userID,string parentID)
        {
            return Session.CreateQuery(@"select distinct new SystemMenu(u.Id,u.Name,u.TreeCode,u.Leaf,u.ParentID,u.TLevel,u.MenuImage,u.ColIndex,u.Remarks,r.UrlPath,r.UrlRel,u.IfiFrame)
                                            from RoleInMenu rm
                                            left join  rm.Role ro
                                            left join  ro.SystemUsers ur
                                            left join  rm.Menu u
                                            left join  u.SystemUrl r  
                                          where ur.Id=:userID
                                            and u.ParentID=:ParentID 
                                            and u.IsDelete=:isdelete
                                            order by u.ColIndex asc")
                             .SetString("userID", userID)
                             .SetString("ParentID", parentID)
                             .SetBoolean("isdelete", false)
                             .List<SystemMenu>();
        }
    }
}
