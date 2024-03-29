﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IScoreOfItemInHouseOrderRepository : IRepository<ScoreOfItemInHouseOrder>
    {
        int GetScoreOfItemInHouseOrdersCount(string valuingOfMyHouseOrderID);
        double GetScoreOfItemInHouseOrdersSum(string valuingOfMyHouseOrderID);
        IList<ScoreOfItemInHouseOrder> Search(List<DataFilter> termList);
        IList<ScoreOfItemInHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
