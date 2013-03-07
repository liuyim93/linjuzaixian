using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface IScoreOfItemInFoodOrderService
    {
        ScoreOfItemInFoodOrder Load(string id);
        int GetScoreOfItemInFoodOrdersCount(string valuingOfMyFoodOrderID);
        void Save(ScoreOfItemInFoodOrder scoreOfItemInFoodOrder);
        void Update(ScoreOfItemInFoodOrder scoreOfItemInFoodOrder);
        void Delete(string id);
        IList<ScoreOfItemInFoodOrder> Search(List<DataFilter> termList);
        IList<ScoreOfItemInFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
