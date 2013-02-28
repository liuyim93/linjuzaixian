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
    public class FeedBackRepository : Repository<FeedBack>, friday.core.repositories.IFeedBackRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(FeedBack)); }
        }
        //对外获取方法
        public IList<FeedBack> Search(List<DataFilter> termList)
        {
            return SearchByFeedBack(Query, termList).List<FeedBack>();
        }
        public IList<FeedBack> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByFeedBack(Query, termList);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<FeedBack>();
        }   


       
    }
}
