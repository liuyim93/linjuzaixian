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
    public class MyFavoriteRepository : Repository<MyFavorite>, IMyFavoriteRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(MyFavorite)); }
        }
        //对外获取方法
        public IList<MyFavorite> Search(List<DataFilter> termList)
        {
            return SearchByMyFavorite(Query, termList, true, null).List<MyFavorite>();
        }
        public IList<MyFavorite> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByMyFavorite(Query, termList, true, null);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<MyFavorite>();
        }
        public IList<MyFavorite> Search(List<DataFilter> termList, List<SystemUser> systemUserList, int start, int limit)
        {
            return SearchByMyFavorite(Query, termList, true, systemUserList)
                .SetFirstResult(start)
                .SetMaxResults(limit)
                .List<MyFavorite>();
        }
    }
}
