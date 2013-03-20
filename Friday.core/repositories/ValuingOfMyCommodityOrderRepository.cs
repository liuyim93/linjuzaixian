using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Linq;
using friday.core.components;

namespace friday.core.repositories
{
    public class ValuingOfMyCommodityOrderRepository : Repository<ValuingOfMyCommodityOrder>, IValuingOfMyCommodityOrderRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(ValuingOfMyCommodityOrder)); }
        }


        public IList<ValuingOfMyCommodityOrder> GetValuingOfMyCommodityOrderByCommodityID(string commodityID)
        {
            var s = (from v in Session.Query<ValuingOfMyCommodityOrder>()
                     join m in Session.Query<MyCommodityOrder>()
                          on v.MyCommodityOrder.Id equals m.Id
                     join o in Session.Query<OrderOfCommodity>()
                       on m.Id equals o.MyCommodityOrder.Id
                     where v.ValuingContent != null && o.Commodity.Id == commodityID
                     select v).Take(3).ToList();
            return s;
        }


        //对外获取方法
        public IList<ValuingOfMyCommodityOrder> Search(List<DataFilter> termList)
        {
            return SearchByValuingOfMyCommodityOrder(Query, termList).List<ValuingOfMyCommodityOrder>();
        }
        public IList<ValuingOfMyCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByValuingOfMyCommodityOrder(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<ValuingOfMyCommodityOrder>();
        }
    }

}
