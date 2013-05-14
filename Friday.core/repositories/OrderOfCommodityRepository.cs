using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Linq;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{

    public class OrderOfCommodityRepository : Repository<OrderOfCommodity>,IOrderOfCommodityRepository
    {
        public List<OrderOfCommodity> geOrderOfCommoditysByMyCommodityOrderID(string MyCommodityOrderID)
        {
            var m = (from x in this.Session.Query<OrderOfCommodity>() select x).Where(o => o.MyCommodityOrder.Id == MyCommodityOrderID && o.IsDelete == false).ToList();
            return m;
        }

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(OrderOfCommodity)); }
        }
        //对外获取方法
        public IList<OrderOfCommodity> Search(List<DataFilter> termList)
        {
            return SearchByOrderOfCommodity(Query, termList, true).List<OrderOfCommodity>();
        }
        public IList<OrderOfCommodity> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByOrderOfCommodity(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<OrderOfCommodity>();
        }
    }
     
}
