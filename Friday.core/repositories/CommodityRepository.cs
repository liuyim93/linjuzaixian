﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
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
        //对外获取方法
        public IList<Commodity> Search(List<DataFilter> termList)
        {
            return SearchByCommodity(Query, termList, true,null).List<Commodity>();
        }
        public IList<Commodity> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByCommodity(Query, termList, true,null);
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<Commodity>();
        }
        public IList<Commodity> Search(List<DataFilter> termList, List<Shop> shopList, int start, int limit)
        {
            return SearchByCommodity(Query, termList, true, shopList)
                .SetFirstResult(start)
                .SetMaxResults(limit)
                .List<Commodity>();
        }
    }
}