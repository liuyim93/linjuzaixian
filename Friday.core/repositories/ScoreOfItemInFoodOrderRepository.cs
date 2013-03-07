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
    public class ScoreOfItemInFoodOrderRepository : Repository<ScoreOfItemInFoodOrder>, IScoreOfItemInFoodOrderRepository
    {
        public virtual int GetScoreOfItemInFoodOrdersCount(string valuingOfMyFoodOrderID)
        {
            var query = (from scoreOfItemInFoodOrder in this.Session.Query<ScoreOfItemInFoodOrder>()
                         where scoreOfItemInFoodOrder.ValuingOfMyFoodOrder.Id == valuingOfMyFoodOrderID && scoreOfItemInFoodOrder.IsDelete == false
                         select scoreOfItemInFoodOrder
                            ).LongCount();
            return Convert.ToInt16(query);
        }

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(ScoreOfItemInFoodOrder)); }
        }
        //对外获取方法
        public IList<ScoreOfItemInFoodOrder> Search(List<DataFilter> termList)
        {
            return SearchByScoreOfItemInFoodOrder(Query, termList).List<ScoreOfItemInFoodOrder>();
        }
        public IList<ScoreOfItemInFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByScoreOfItemInFoodOrder(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<ScoreOfItemInFoodOrder>();
        }
    }

}
