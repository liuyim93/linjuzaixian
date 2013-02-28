using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.repositories
{
    public class ActivityRepository : Repository<Activity>, IActivityRepository
    {        
       
        public Activity SearchByShortName(string name)
        {
            var m = (from x in this.Session.Query<Activity>() select x).Where(o => o.Name == name).SingleOrDefault();
            return m;
        }

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Activity)); }
        }
        //对外获取方法
        public IList<Activity> Search(List<DataFilter> termList)
        {
            return SearchByActivity(Query, termList, true).List<Activity>();
        }
        public IList<Activity> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByActivity(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Activity>();
        }


    }
     
}
