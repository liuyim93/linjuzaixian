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
    public class CommodityRepository : Repository<Commodity>,ICommodityRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Commodity)); }
        }

        public IList<Commodity> GetHotCommodity(int num)
        {
            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.IsDelete == false).OrderByDescending(o => o.CreateTime).Take(num).ToList();
            return s;
        }

        public IList<Commodity> GetRecentCommodity(int num)
        {
            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Take(num).ToList();
            return s;
        }
        public IList<Commodity> GetHotRecommendCommoditiesByKeyWord(string keyword)
        {
            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) &&o.IsDelete == false).OrderBy(o => o.MonthAmount).ToList();
            return s;
        }

        public IList<Commodity> GetCommodityByShopIDOrderByMonthAmountDesc(string shopID)
        {
            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID).OrderByDescending(o=>o.MonthAmount).Take(12).ToList();
            return s;
        }
        public IList<Commodity> GetCommodityByShopIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string shopID, string merchantGoodTypeID, int start, int limit, out int total)
        {
            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.GlobalGoodsType.Id == merchantGoodTypeID && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.GlobalGoodsType.Id == merchantGoodTypeID && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Count();        
            return s;
        }
        public IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string goodTypeId, string orderType, int start, int limit, out int total)
        {
            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).Count();
                return s;        
            
        }
        public IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType)
        {

            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1)).OrderByDescending(o => o.MonthAmount).ToList();
              return s;           
        }
        public IList<Commodity> GetCommodityByKeywordAndPrice(string page, string keyword, double price1, double price2, int start, int limit, out int total)
        {

            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.IsDelete == false).Count();
            return s;        
            
        }
        /// <summary>
        /// 2013-05-09 basilwang 得到同一级父类下的商品
        /// </summary>
        /// <param name="goodsTypeId"></param>
        /// <returns></returns>
        public List<Commodity> GetCommodityByGoodsType(string goodsTypeId)
        {
            var s = (from x in this.Session.Query<Commodity>()
                     where x.IsDelete == false && goodsTypeId.IndexOf(x.GlobalGoodsTypeFamily)!=-1
                     select x                
                    ).OrderByDescending(o => o.CreateTime).Take(6).ToList();
            return s;
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
