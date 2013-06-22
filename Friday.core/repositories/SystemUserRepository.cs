using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using NHibernate.Linq;

namespace friday.core.repositories
{
    public class SystemUserRepository : Repository<SystemUser>,ISystemUserRepository
    {
         public bool ValidateTel(string tel) 
        {
            var q = (from x in this.Session.Query<SystemUser>() select x).Where(o => o.IsDelete == false && o.Tel== tel).Count() > 0 ? false : true; ;
            return q;
        }
         public bool ValidateLoginHasSystemUser(string LName)
         {
             var q = (from x in this.Session.Query<SystemUser>() select x).Where(o => o.IsDelete == false && o.LoginUser.LoginName == LName).Count() > 0 ? true : false; ;
             return q;
         }
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(SystemUser)); }
        }
        //对外获取方法
        public IList<SystemUser> Search(List<DataFilter> termList)
        {
            return SearchBySystemUser(Query, termList).List<SystemUser>();
        }
        public IList<SystemUser> Search(List<DataFilter> termList, int start, int limit, out long total)
        {      
            ICriteria query = SearchBySystemUser(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<SystemUser>();
        }
      
    }
     
}
