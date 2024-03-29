﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using NHibernate;
using friday.core.components;
using NHibernate.Linq;

namespace friday.core.repositories
{
    public class ScoreOfItemInHouseOrderRepository : Repository<ScoreOfItemInHouseOrder>, IScoreOfItemInHouseOrderRepository
    {
        public virtual int GetScoreOfItemInHouseOrdersCount(string valuingOfMyHouseOrderID)
        {
            var query = (from scoreOfItemInHouseOrder in this.Session.Query<ScoreOfItemInHouseOrder>()
                         where scoreOfItemInHouseOrder.ValuingOfMyHouseOrder.Id == valuingOfMyHouseOrderID && scoreOfItemInHouseOrder.IsDelete == false
                         select scoreOfItemInHouseOrder
                            ).LongCount();
            return Convert.ToInt16(query);
        }

        public virtual double GetScoreOfItemInHouseOrdersSum(string valuingOfMyHouseOrderID)
        {
            var query = (from scoreOfItemInHouseOrder in this.Session.Query<ScoreOfItemInHouseOrder>()
                         where scoreOfItemInHouseOrder.ValuingOfMyHouseOrder.Id == valuingOfMyHouseOrderID && scoreOfItemInHouseOrder.IsDelete == false
                         select scoreOfItemInHouseOrder
                            ).Sum(o=>o.Score);
            return Convert.ToDouble(query);
        }

        protected virtual ICriteria Query
        {
            get { return Session.CreateCriteria(typeof(ScoreOfItemInHouseOrder)); }
        }
        //对外获取方法
        public IList<ScoreOfItemInHouseOrder> Search(List<DataFilter> termList)
        {
            return SearchByScoreOfItemInHouseOrder(Query, termList).List<ScoreOfItemInHouseOrder>();
        }
        public IList<ScoreOfItemInHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            ICriteria query = SearchByScoreOfItemInHouseOrder(Query, termList);
            //2013-02-11 basilwang must use projection.rowcount and clear order ( sql does't support only count(*) and order by)
            ICriteria countCriteria = CriteriaTransformer.Clone(query)
            .SetProjection(NHibernate.Criterion.Projections.RowCountInt64());

            countCriteria.ClearOrders();
            total = countCriteria.UniqueResult<long>();
            return query.SetFirstResult(start)
                 .SetMaxResults(limit)
                 .List<ScoreOfItemInHouseOrder>();
        }
    }

}
