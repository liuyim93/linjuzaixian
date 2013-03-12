using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.repositories
{
    public class HouseRepository : Repository<House>, friday.core.repositories.IHouseRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(House)); }
        }

        public IList<House> GetHouseByRentIDOrderByMonthAmountDesc(string rentID)
        {
            var s = (from x in this.Session.Query<House>() select x).Where(o => o.Rent.Id == rentID).OrderByDescending(o => o.MonthAmount).ToList();
            return s;
        }

        //对外获取方法
        public IList<House> Search(List<DataFilter> termList)
        {
            return SearchByHouse(Query, termList, true,null).List<House>();
        }
        public IList<House> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByHouse(Query, termList, true,null);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<House>();
        }
        public IList<House> Search(List<DataFilter> termList,List<Rent> shopList,int start, int limit)
        {
            return SearchByHouse(Query, termList, true, shopList)
                .SetFirstResult(start)
                .SetMaxResults(limit)
                .List<House>();
        }
    }
}
