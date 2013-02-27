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
            var list = (from x in this.Session.Query<SystemMenu>() select x).Where(o => o.ParentID == ParentID).ToList();
            return list;
        }

        public bool IsHaveChild(SystemMenu systemMenu)
        {
            var isHaveChild = (from x in this.Session.Query<SystemMenu>() select x).Where(o => o.ParentID == systemMenu.Id).Count() > 0 ? true : false;
            return isHaveChild;
        }


    }
}
