using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Linq;
using friday.core.components;
using friday.core.domain;

namespace friday.core.repositories
{
    public class ValuingOfMyFoodOrderRepository : Repository<ValuingOfMyFoodOrder>, IValuingOfMyFoodOrderRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(ValuingOfMyFoodOrder)); }
        }

        public IList<ValuingOfMyFoodOrder> GetValuingOfMyFoodOrderByFoodID(string foodID)
        {
            var s = (from v in Session.Query<ValuingOfMyFoodOrder>()
                     join m in Session.Query<MyFoodOrder>()
                          on v.MyFoodOrder.Id equals m.Id
                          join o in Session.Query<OrderOfFood>()
                            on m.Id equals o.MyFoodOrder.Id
                     where v.ValuingContent != null && o.Food.Id == foodID
                     select v).Take(3).ToList();
            return s;
        }

        //对外获取方法
        public IList<ValuingOfMyFoodOrder> Search(List<DataFilter> termList)
        {
            return SearchByValuingOfMyFoodOrder(Query, termList).List<ValuingOfMyFoodOrder>();
        }
        public IList<ValuingOfMyFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByValuingOfMyFoodOrder(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<ValuingOfMyFoodOrder>();
        }
    }

}
