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
    public class ShopRepository : Repository<Shop>, IShopRepository
    {
        public IList<Shop> GetShopsBySchoolID(string SchoolID)
        {
            return (from x in this.Session.Query<Shop>() select x).Where(o => (o.Schools.Contains(SchoolID) && o.IsDelete == false)).ToList();
        }

        public Shop SearchByShortName(string name)
        {
            var m = (from x in this.Session.Query<Shop>() select x).Where(o => o.ShortName == name && o.IsDelete == false).SingleOrDefault();
            return m;
        }
        public IList<Shop> GetShopsByMerchantType(MerchantTypeEnum mTP)
        {
            var m = (from x in this.Session.Query<Shop>() select x).Where(o => o.MerchantType == mTP && o.IsDelete == false).ToList<Shop>();
            return m;
        }

        public IList<Shop> GetShopsByMerchantType(MerchantTypeEnum mTP, string selectIP)
        {
            var m = (from x in this.Session.Query<Shop>() select x).Where(o => o.MerchantType == mTP && o.Schools.Contains(selectIP) && o.IsDelete == false).ToList<Shop>();
            return m;
        }
    

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Shop)); }
        }
        //对外获取方法
        public IList<Shop> Search(List<DataFilter> termList)
        {
            return SearchByShop(Query, termList, true).List<Shop>();
        }
        public IList<Shop> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByShop(Query, termList, true);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Shop>();
        }


    }
     
}
