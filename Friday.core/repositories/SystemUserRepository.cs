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


namespace friday.core.repositories
{
    public class SystemUserRepository : Repository<SystemUser>,ISystemUserRepository
    {
        public IList<SystemUser> GetSystemUsersByPageList(int start, int limit, out long total)
        {
            var q = Session.CreateQuery(@"select distinct u from SystemUser as u where u.IsDelete=false and u.IsAnonymous=false order by CreateTime desc")
                  .SetFirstResult(start)
                  .SetMaxResults(limit).List<SystemUser>();
            total = Session.CreateQuery(@"select count(distinct u) from SystemUser as u where u.IsDelete=false and u.IsAnonymous=false ")
                 .UniqueResult<long>();

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
