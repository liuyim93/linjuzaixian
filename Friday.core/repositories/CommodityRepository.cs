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
using System.Linq.Expressions;

namespace friday.core.repositories
{
    public class CommodityRepository : Repository<Commodity>,ICommodityRepository
    {
        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(Commodity)); }
        }

        public int GetCommodityCountByFamily(string ParentID)
        {
            return (from x in this.Session.Query<Commodity>() select x).Where(o =>(o.GlobalGoodsTypeFamily.Contains(ParentID)||o.GlobalGoodsType.Id==ParentID) && o.IsDelete == false).ToList().Count;
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
            if (orderType == "MonthAmount")
            {
                var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
                total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).Count();
                return s;
            }
            else if (orderType == "CreateTime") 
            {
                var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).OrderByDescending(o => o.CreateTime).Skip(start).Take(limit).ToList();
                total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).Count();
                return s;
            }
            else if (orderType == "Price")
            {
                var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).OrderByDescending(o => o.Price).Skip(start).Take(limit).ToList();
                total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).Count();
                return s;
            }
            else 
            {
                var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).OrderByDescending(o => o.ValuingCount).Skip(start).Take(limit).ToList();
                total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsType.Id == goodTypeId || goodTypeId == "0") && o.IsDelete == false).Count();
                return s;
            }


        }
        public IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType)
        {

            var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Shop.Id == shopID && o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1)).OrderByDescending(o => o.MonthAmount).ToList();
              return s;           
        }
        public IList<Commodity> GetCommodityByKeywordAndPrice(string page, string keyword, double price1, double price2, int start, int limit, out int total,string cat,string sort)
        {
            //if (cat != "" && cat != null)
            //{
            //    var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsTypeFamily.Contains(cat)||o.GlobalGoodsType.Id==cat) && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            //    total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.IsDelete == false).Count();
            //    return s;
            //}
            //else
            //{
            //    var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            //    total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.IsDelete == false).Count();
            //    return s;

            //}
            Expression<Func<Commodity, object>> order_expression = o=>o.MonthAmount;
            bool is_desc = true;
            switch (sort)
            {
                case "p":
                    order_expression = o => o.Price;
                    is_desc = false;
                    break;
                case "pd":
                      order_expression = o => o.Price;
                    is_desc = true;
                    break;
                case "td":
                    order_expression = o => o.Amount;
                    is_desc = true;
                    break;
                case "d":
                    order_expression = o => o.MonthAmount;
                    is_desc = true;
                    break;
                case "s":
                case "st":
                case "pt":
                    order_expression = o => o.CreateTime;
                    is_desc = true;
                    break;
                
            }
            //2013-05-23 basilwang 重构
            var query = (from x in this.Session.Query<Commodity>() select x).Where((o =>o.IsDelete==false&&(o.Name.Contains(keyword)||o.Shop.Name.Contains(keyword)) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1)));
            if (cat != "")
                query = (from x in this.Session.Query<Commodity>() select x).Where(o =>o.IsDelete==false&&( o.Name.Contains(keyword)||o.Shop.Name.Contains(keyword))&& (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsTypeFamily.Contains(cat) || o.GlobalGoodsType.Id == cat));
            IOrderedQueryable<Commodity> ordered_query;
            if(is_desc)
                ordered_query=query.OrderByDescending(order_expression);
            else
                ordered_query = query.OrderBy(order_expression);
            var paged_ordered_query=ordered_query.Skip(start).Take(limit);
            total = query.Count();
            return paged_ordered_query.ToList();
            
        }
        public IList<Commodity> GetCommodityByKeywordAndPrice(string page, string keyword, double price1, double price2, int start, int limit, out int total, string cat, string sort,string schoolId)
        {
            //if (cat != "" && cat != null)
            //{
            //    var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsTypeFamily.Contains(cat)||o.GlobalGoodsType.Id==cat) && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            //    total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.IsDelete == false).Count();
            //    return s;
            //}
            //else
            //{
            //    var s = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.IsDelete == false).OrderByDescending(o => o.MonthAmount).Skip(start).Take(limit).ToList();
            //    total = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.IsDelete == false).Count();
            //    return s;

            //}
            Expression<Func<Commodity, object>> order_expression = o => o.MonthAmount;
            bool is_desc = true;
            switch (sort)
            {
                case "p":
                    order_expression = o => o.Price;
                    is_desc = false;
                    break;
                case "pd":
                    order_expression = o => o.Price;
                    is_desc = true;
                    break;
                case "td":
                    order_expression = o => o.Amount;
                    is_desc = true;
                    break;
                case "d":
                    order_expression = o => o.MonthAmount;
                    is_desc = true;
                    break;
                case "s":
                case "st":
                case "pt":
                    order_expression = o => o.CreateTime;
                    is_desc = true;
                    break;

            }
            //2013-05-23 basilwang 重构
            var query = (from x in this.Session.Query<Commodity>() select x).Where((o => o.IsDelete == false && (o.Name.Contains(keyword) || o.Shop.Name.Contains(keyword)) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1)&&o.Shop.Schools.Contains(schoolId)));
            if (cat != "")
                query = (from x in this.Session.Query<Commodity>() select x).Where(o => o.IsDelete == false && o.Shop.Schools.Contains(schoolId)&& (o.Name.Contains(keyword) || o.Shop.Name.Contains(keyword)) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && (o.GlobalGoodsTypeFamily.Contains(cat) || o.GlobalGoodsType.Id == cat));
            IOrderedQueryable<Commodity> ordered_query;
            if (is_desc)
                ordered_query = query.OrderByDescending(order_expression);
            else
                ordered_query = query.OrderBy(order_expression);
            var paged_ordered_query = ordered_query.Skip(start).Take(limit);
            total = query.Count();
            return paged_ordered_query.ToList();

        }
        public IList<Commodity> GetCommodityByType(string page, double price1, double price2, int start, int limit, out int total, string sort,MerchantTypeEnum type)
        {
            Expression<Func<Commodity, object>> order_expression = o => o.MonthAmount;
            bool is_desc = true;
            switch (sort)
            {
                case "p":
                    order_expression = o => o.Price;
                    is_desc = false;
                    break;
                case "pd":
                    order_expression = o => o.Price;
                    is_desc = true;
                    break;
                case "td":
                    order_expression = o => o.Amount;
                    is_desc = true;
                    break;
                case "d":
                    order_expression = o => o.MonthAmount;
                    is_desc = true;
                    break;
                case "s":
                case "st":
                case "pt":
                    order_expression = o => o.CreateTime;
                    is_desc = true;
                    break;

            }
            //2013-05-23 basilwang 重构
            var query = (from x in this.Session.Query<Commodity>() select x).Where((o => o.IsDelete == false && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1)&&o.Shop.MerchantType==type));

            IOrderedQueryable<Commodity> ordered_query;
            if (is_desc)
                ordered_query = query.OrderByDescending(order_expression);
            else
                ordered_query = query.OrderBy(order_expression);
            var paged_ordered_query = ordered_query.Skip(start).Take(limit);
            total = query.Count();
            return paged_ordered_query.ToList();
        }
        public IList<Commodity> GetCommodityByShopIDAndKeywordAndPrice(string shopID, string page, string keyword, double price1, double price2, int start, int limit, out int total,string sort)
        {           
            Expression<Func<Commodity, object>> order_expression = o => o.MonthAmount;
            bool is_desc = true;
            switch (sort)
            {
                case "p":
                    order_expression = o => o.Price;
                    is_desc = false;
                    break;
                case "pd":
                    order_expression = o => o.Price;
                    is_desc = true;
                    break;
                case "ma":
                    order_expression = o => o.MonthAmount;
                    is_desc = false;
                    break;
                case "md":
                    order_expression = o => o.MonthAmount;
                    is_desc = true;
                    break;
                case "ca":
                    order_expression = o => o.CreateTime;
                    is_desc = false;
                    break;
                case "cd":
                    order_expression = o => o.CreateTime;
                    is_desc = true;
                    break;
                case "va":
                    order_expression = o => o.ValuingCount;
                    is_desc = false;
                    break;
                case "vd":
                    order_expression = o => o.ValuingCount;
                    is_desc = true;
                    break;
                case "s":
                case "st":
                case "pt":
                    order_expression = o => o.CreateTime;
                    is_desc = true;
                    break;

            }

            //2013-05-23 basilwang 重构
            var query = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.Shop.Id== shopID&& o.IsDelete == false);
            IOrderedQueryable<Commodity> ordered_query;
            if (is_desc)
                ordered_query = query.OrderByDescending(order_expression);
            else
                ordered_query = query.OrderBy(order_expression);
            var paged_ordered_query = ordered_query.Skip(start).Take(limit);
            total = query.Count();
            return paged_ordered_query.ToList();

        }
        public IList<Commodity> GetCommodityByShopIDAndKeywordAndPriceAndType(string shopID, string page, string keyword, double price1, double price2, int start, int limit, out int total, string sort,string goodType)
        {
            Expression<Func<Commodity, object>> order_expression = o => o.MonthAmount;
            bool is_desc = true;
            switch (sort)
            {
                case "p":
                    order_expression = o => o.Price;
                    is_desc = false;
                    break;
                case "pd":
                    order_expression = o => o.Price;
                    is_desc = true;
                    break;
                case "ma":
                    order_expression = o => o.MonthAmount;
                    is_desc = false;
                    break;
                case "md":
                    order_expression = o => o.MonthAmount;
                    is_desc = true;
                    break;
                case "ca":
                    order_expression = o => o.CreateTime;
                    is_desc = false;
                    break;
                case "cd":
                    order_expression = o => o.CreateTime;
                    is_desc = true;
                    break;
                case "va":
                    order_expression = o => o.ValuingCount;
                    is_desc = false;
                    break;
                case "vd":
                    order_expression = o => o.ValuingCount;
                    is_desc = true;
                    break;
                case "s":
                case "st":
                case "pt":
                    order_expression = o => o.CreateTime;
                    is_desc = true;
                    break;

            }

            //2013-05-23 basilwang 重构
            var query = (from x in this.Session.Query<Commodity>() select x).Where(o => o.Name.Contains(keyword) && (o.Price >= price1 || price1 == -1) && (o.Price <= price2 || price2 == -1) && o.Shop.Id == shopID && o.IsDelete == false && (o.GlobalGoodsType.ParentID==goodType||o.GlobalGoodsType.Id==goodType));
            IOrderedQueryable<Commodity> ordered_query;
            if (is_desc)
                ordered_query = query.OrderByDescending(order_expression);
            else
                ordered_query = query.OrderBy(order_expression);
            var paged_ordered_query = ordered_query.Skip(start).Take(limit);
            total = query.Count();
            return paged_ordered_query.ToList();

        }

        /// <summary>
        /// 2013-05-09 basilwang 得到同一级父类下的商品
        /// </summary>
        /// <param name="goodsTypeId"></param>
        /// <returns></returns>
        public List<Commodity> GetCommodityByGoodsType(string goodsTypeId)
        {
            var s = (from x in this.Session.Query<Commodity>()
                     where x.IsDelete == false && x.GlobalGoodsTypeFamily.Contains(goodsTypeId)
                     select x                
                    ).ToList();
            return s;
        }

        public List<Commodity> GetCommodityByGoodsTypeAndSchoolID(string goodsTypeId, string schoolID)
        {
            var s = (from x in this.Session.Query<Commodity>()
                     where x.IsDelete == false && x.GlobalGoodsTypeFamily.Contains(goodsTypeId) && x.Shop.Schools.Contains(schoolID)
                     select x
                    ).ToList();
            return s;
        }

        public List<Commodity> GetCommodityBySchoolID(string schoolID)
        {
            var s = (from x in this.Session.Query<Commodity>()
                     where x.IsDelete == false && x.Shop.Schools.Contains(schoolID)
                     select x
                    ).ToList();
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
