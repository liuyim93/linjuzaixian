﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IScoreOfItemInCommodityOrderRepository : IRepository<ScoreOfItemInCommodityOrder>
    {
        int GetScoreOfItemInCommodityOrdersCount(string valuingOfMyCommodityOrderID);
        double GetScoreOfItemInCommodityOrdersSum(string valuingOfMyCommodityOrderID);
        IList<ScoreOfItemInCommodityOrder> Search(List<DataFilter> termList);
        IList<ScoreOfItemInCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
