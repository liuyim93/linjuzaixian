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
    public class RestaurantRepository : Repository<Restaurant>, IRestaurantRepository
    {


        //public Restaurant SearchByShortName(string  name) 
        //{
        //    var q = Session.CreateQuery(@"select rt  from   Restaurant as  rt   where  rt.ShortName=:rshortname ")
        //              .SetString("rshortname", name).UniqueResult<Restaurant>(); ;
           
        //    return q;
        //}
        public Restaurant SearchByShortName(string name)
        {
            var m = (from x in this.Session.Query<Restaurant>() select x).Where(o => o.ShortName == name).SingleOrDefault();
            return m;
        }

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Restaurant)); }
        }
        //对外获取方法
        public IList<Restaurant> Search(List<DataFilter> termList)
        {
            return SearchByRestaurant(Query, termList, true).List<Restaurant>();
        }
        public IList<Restaurant> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByRestaurant(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Restaurant>();
        }

        //public Restaurant SearchByShortName(string shortName)
        //{
        //    return Query.Add(Restrictions.Eq("ShortName", shortName)).Add(Restrictions.Eq("IsDelete", false)).List<Restaurant>().FirstOrDefault();
        //}


    }
     
}
