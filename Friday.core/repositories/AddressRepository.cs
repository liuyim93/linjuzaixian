using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using NHibernate;
using friday.core.domain;

namespace friday.core.repositories
{
    public class AddressRepository : Repository<Address>, friday.core.repositories.IAddressRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Address)); }
        }
        //对外获取方法
        public IList<Address> Search(List<DataFilter> termList)
        {
            return SearchByAddress(Query, termList, true,null).List<Address>();
        }
        public IList<Address> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByAddress(Query, termList, true,null);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Address>();
        }
        public IList<Address> Search(List<DataFilter> termList, List<SystemUser> systemUserList, int start, int limit)
        {
            return SearchByAddress(Query, termList, true, systemUserList)
                .SetFirstResult(start)
                .SetMaxResults(limit)
                .List<Address>();
        }
    }
}
