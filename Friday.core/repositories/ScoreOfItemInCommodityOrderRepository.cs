﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using NHibernate;
using friday.core.components;

namespace friday.core.repositories
{
    public class ScoreOfItemInCommodityOrderRepository : Repository<ScoreOfItemInCommodityOrder>, IScoreOfItemInCommodityOrderRepository
    {

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(ScoreOfItemInCommodityOrder)); }
        }
        //对外获取方法
        public IList<ScoreOfItemInCommodityOrder> Search(List<DataFilter> termList)
        {
            return SearchByScoreOfItemInCommodityOrder(Query, termList).List<ScoreOfItemInCommodityOrder>();
        }
        public IList<ScoreOfItemInCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByScoreOfItemInCommodityOrder(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<ScoreOfItemInCommodityOrder>();
        }
    }
     
}