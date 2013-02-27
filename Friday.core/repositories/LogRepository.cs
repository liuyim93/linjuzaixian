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
    public class LogRepository : Repository<Log>, ILogRepository
    {
        
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Log)); }
        }
        //对外获取方法
        public IList<Log> Search(List<DataFilter> termList)
        {
            return SearchByLog(Query, termList, true).List<Log>();
        }
        public IList<Log> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByLog(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Log>();
        }

          public Log GerLogByLogID(string id)
        {
            var q = Session.CreateQuery(@"select lg  from   Log as  lg   where  lg.LogID=:lid ")
                      .SetString("lid", id).UniqueResult<Log>(); ;

            return q;
        }
        


    }
     
}
