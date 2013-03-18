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
    public class CommodityRepository : Repository<Commodity>,ICommodityRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Commodity)); }
        }

        public IList<Commodity> GetCommodityByShopIDOrderByMonthAmountDesc(string shopID)
        {
            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID).OrderByDescending(o=>o.MonthAmount).ToList();
            return s;
        }
        public IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType)
        {             
            if (price1 != -1&&price2!=-1)
            {
              var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && o.Price >= price1 && o.Price <= price2).OrderByDescending(o => o.MonthAmount).ToList();
              return s;
            }
            else if (price1 == -1 && price2 == -1)
            {
                var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword)).OrderByDescending(o => o.MonthAmount).ToList();
                return s;
            }
            else if (price1 == -1 && price2 != -1)
            {
                var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && o.Price <= price2).OrderByDescending(o => o.MonthAmount).ToList();
                return s;
            }
            else 
            {
                var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && o.Price >= price1).OrderByDescending(o => o.MonthAmount).ToList();
                return s;
            }
        }
        //对外获取方法
        public IList<Commodity> Search(List<DataFilter> termList)
        {
            return SearchByCommodity(Query, termList, true).List<Commodity>();
        }
        public IList<Commodity> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByCommodity(Query, termList);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Commodity>();
        }
    }
}
