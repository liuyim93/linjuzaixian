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
    public class FoodRepository : Repository<Food>, friday.core.repositories.IFoodRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Food)); }
        }
        //对外获取方法
        public IList<Food> Search(List<DataFilter> termList)
        {
            return SearchByFood(Query, termList, true,null).List<Food>();
        }
        public IList<Food> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByFood(Query, termList, true,null);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Food>();
        }
        public IList<Food> Search(List<DataFilter> termList, List<Restaurant> restaurantList, int start, int limit)
        {
            return SearchByFood(Query, termList, true, restaurantList)
                .SetFirstResult(start)
                .SetMaxResults(limit)
                .List<Food>();
        }
    }
}
