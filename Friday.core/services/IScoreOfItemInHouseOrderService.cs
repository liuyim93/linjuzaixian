using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface IScoreOfItemInHouseOrderService
    {
        ScoreOfItemInHouseOrder Load(string id);
        int GetScoreOfItemInHouseOrdersCount(string valuingOfMyHouseOrderID);
        double GetScoreOfItemInHouseOrdersSum(string valuingOfMyHouseOrderID);
        void Save(ScoreOfItemInHouseOrder scoreOfItemInHouseOrder);
        void Update(ScoreOfItemInHouseOrder scoreOfItemInHouseOrder);
        void Delete(string id);
        IList<ScoreOfItemInHouseOrder> Search(List<DataFilter> termList);
        IList<ScoreOfItemInHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
