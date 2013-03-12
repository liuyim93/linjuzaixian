using System;
using friday.core.domain;
using friday.core.components;
using System.Collections.Generic;
namespace friday.core.repositories
{
    public interface IFoodRepository:IRepository<Food>
    {
        IList<Food> GetFoodByRestaurantIDOrderByMonthAmountDesc(string restaurantID);
        System.Collections.Generic.IList<Food> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<Food> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}
