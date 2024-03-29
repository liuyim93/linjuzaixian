﻿using System;
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
    public class FoodRepository : Repository<Food>, friday.core.repositories.IFoodRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Food)); }
        }

        public IList<Food> GetFoodByRestaurantIDOrderByMonthAmountDesc(string restaurantID)
        {
            var s = (from x in this.Session.Query<Food>() select x).Where(o => o.Restaurant.Id == restaurantID).OrderByDescending(o => o.MonthAmount).Take(12).ToList();
            return s;
        }
        public IList<Food> GetFoodByRestaurantIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string restaurantID, string merchantGoodTypeID, int start, int limit, out int total)
        {
            var s = (from x in this.Session.Query<Food>() select x).Where(o => o.Restaurant.Id == restaurantID && o.GlobalGoodsType.Id == merchantGoodTypeID && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<Food>() select x).Where(o => o.Restaurant.Id == restaurantID && o.GlobalGoodsType.Id == merchantGoodTypeID && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Count();
            return s;
        }
        public IList<Food> GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(string restaurantID, string keyword, double price1, double price2,string goodTypeId, string orderType, int start, int limit, out int total)
        {

            var s = (from x in this.Session.Query<Food>() select x).Where(o => o.Restaurant.Id == restaurantID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<Food>() select x).Where(o => o.Restaurant.Id == restaurantID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).Count();
                return s;          

        }
        public IList<Food> GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(string restaurantID, string keyword, double price1, double price2, string orderType)
        {            
                var s = (from x in this.Session.Query<Food>() select x).Where(o => o.Restaurant.Id == restaurantID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) ).OrderByDescending(o => o.MonthAmount).ToList();
                return s;           
        }
        //对外获取方法
        public IList<Food> Search(List<DataFilter> termList)
        {
            return SearchByFood(Query, termList).List<Food>();
        }
        public IList<Food> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByFood(Query, termList);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Food>();
        }
   
    }
}
