using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using NHibernate;
using friday.core.components;
using NHibernate.Linq;

namespace friday.core.repositories
{
    public class ValuingCommentsRepository : Repository<ValuingComments>, IValuingCommentsRepository
    {
        public virtual int GetValuingCommentsCount(string valuingID)
        {
            var query = (from valuingComments in this.Session.Query<ValuingComments>()
                         where valuingComments.Valuing.Id == valuingID
                         select valuingComments
                            ).LongCount();
            return Convert.ToInt16(query);
        }

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(ValuingComments)); }
        }
        //对外获取方法
        public IList<ValuingComments> Search(List<DataFilter> termList)
        {
            return SearchByValuingComments(Query, termList).List<ValuingComments>();
        }
        public IList<ValuingComments> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByValuingComments(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<ValuingComments>();
        }
    }

}
