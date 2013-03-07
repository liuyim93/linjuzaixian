using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface IScoreOfItemInCommodityOrderService
    {
        ScoreOfItemInCommodityOrder Load(string id);
        int GetScoreOfItemInCommodityOrdersCount(string valuingOfMyCommodityOrderID);
        void Save(ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder);
        void Update(ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder);
        void Delete(string id);
        IList<ScoreOfItemInCommodityOrder> Search(List<DataFilter> termList);
        IList<ScoreOfItemInCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
