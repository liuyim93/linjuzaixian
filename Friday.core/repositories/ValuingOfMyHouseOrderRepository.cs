using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using NHibernate;

namespace friday.core.repositories
{
    public class ValuingOfMyHouseOrderRepository : Repository<ValuingOfMyHouseOrder>, IValuingOfMyHouseOrderRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(ValuingOfMyHouseOrder)); }
        }
        //对外获取方法
        public IList<ValuingOfMyHouseOrder> Search(List<DataFilter> termList)
        {
            return SearchByValuingOfMyHouseOrder(Query, termList).List<ValuingOfMyHouseOrder>();
        }
        public IList<ValuingOfMyHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByValuingOfMyHouseOrder(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<ValuingOfMyHouseOrder>();
        }
    }

}
