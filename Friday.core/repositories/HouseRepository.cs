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
            var s = (from x in this.Session.Query<House>() select x).Where(o => o.Rent.Id == rentID).OrderByDescending(o => o.MonthAmount).Take(12).ToList();
            return s;
        }
        public IList<House> GetHouseByRentIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string rentID, string merchantGoodTypeID, int start, int limit, out int total)
        {
            var s = (from x in this.Session.Query<House>() select x).Where(o => o.Rent.Id == rentID && o.MerchantGoodsType.Id == merchantGoodTypeID && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<House>() select x).Where(o => o.Rent.Id == rentID && o.MerchantGoodsType.Id == merchantGoodTypeID && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Count();
            return s;
        }
        public IList<House> GetHouseByRentIDAndKeywordAndBetweenPriceOrderBy(string rentID, string keyword, double price1, double price2,string goodTypeId, string orderType, int start, int limit, out int total)
        {


            var s = (from x in this.Session.Query<House>() select x).Where(o => o.Rent.Id == rentID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.MerchantGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<House>() select x).Where(o => o.Rent.Id == rentID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.MerchantGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).Count();
                return s;
           
        }
        public IList<House> GetHouseByRentIDAndKeywordAndBetweenPriceOrderBy(string rentID, string keyword, double price1, double price2, string orderType)
        {
            var s = (from x in this.Session.Query<House>() select x).Where(o => o.Rent.Id == rentID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1)).OrderByDescending(o => o.MonthAmount).ToList();
                return s;
          
        }
        //对外获取方法
        public IList<House> Search(List<DataFilter> termList)
        {
            return SearchByHouse(Query, termList, true).List<House>();
        }
        public IList<House> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByHouse(Query, termList);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<House>();
        }
   
    }
}
