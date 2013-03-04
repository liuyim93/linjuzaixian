using System;
using friday.core.domain;
using friday.core.components;
namespace friday.core.repositories
{
    public interface IFoodStatisticRepository:IRepository<FoodStatistic>
    {

        System.Collections.Generic.IList<FoodStatistic> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<FoodStatistic> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}
