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
    public class CartOfCommodityRepository : Repository<CartOfCommodity>, ICartOfCommodityRepository
    {

        public List<CartOfCommodity> getCommoditiesByShoppingCart(string ShoppingCartID)
        {
            var m = (from x in this.Session.Query<CartOfCommodity>() select x).Where(o => o.ShoppingCart.Id == ShoppingCartID && o.IsDelete == false).ToList();
            return m;
        }

        public CartOfCommodity getCommodityBySystemUserIDAndCommodityID(string SystemUserID, string CommodityID ,bool isDelete)
        {
            var m = (from x in this.Session.Query<CartOfCommodity>() select x).Where(o => o.Commodity.Id == CommodityID && o.ShoppingCart.SystemUser.Id == SystemUserID && o.IsDelete == isDelete).SingleOrDefault();
            return m;
        }

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(CartOfCommodity)); }
        }
        //对外获取方法
        //public IList<CartOfCommodity> Search(List<DataFilter> termList)
        //{
        //    return SearchByCartOfCommodity(Query, termList, true).List<CartOfCommodity>();
        //}
        //public IList<CartOfCommodity> Search(List<DataFilter> termList, int start, int limit, out long total)
        //{
        //    ICriteria query = SearchByCartOfCommodity(Query, termList, true);
        //    //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
        //    ICriteria countCriteria = CriteriaTransformer.Clone(query)
        //    .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

        //    countCriteria.ClearOrders();
        //    total = countCriteria.UniqueResult<long>();
        //    return query.SetFirstResult(start)
        //         .SetMaxResults(limit)
        //         .List<CartOfCommodity>();
        //}

    }
     
}
