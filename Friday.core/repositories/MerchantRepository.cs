using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using friday.core.components;

namespace friday.core.repositories
{

    public class MerchantRepository : Repository<Merchant>, IMerchantRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Merchant)); }
        }
        //对外获取方法
        public IList<Merchant> Search(List<DataFilter> termList)
        {
            return SearchByMerchant(Query, termList, true).List<Merchant>();
        }
        public IList<Merchant> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByMerchant(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Merchant>();
        }


    }
     
}
