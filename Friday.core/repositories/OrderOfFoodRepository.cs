using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{

    public class OrderOfFoodRepository : Repository<OrderOfFood>,IOrderOfFoodRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(OrderOfFood)); }
        }
        //对外获取方法
        public IList<OrderOfFood> Search(List<DataFilter> termList)
        {
            return SearchByOrderOfFood(Query, termList, true).List<OrderOfFood>();
        }
        public IList<OrderOfFood> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByOrderOfFood(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<OrderOfFood>();
        }
    }
     
}
