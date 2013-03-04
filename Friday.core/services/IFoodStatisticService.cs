using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IFoodStatisticService
    {
        FoodStatistic Load(string id);
        void Save(FoodStatistic foodStatistic);
        void Update(FoodStatistic foodStatistic);
        void Delete(string id);
       
        //IList<FoodStatistic> Search(List<DataFilter> termList);
        //IList<FoodStatistic> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
