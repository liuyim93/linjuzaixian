using System;
using friday.core.domain;
using friday.core.components;
namespace friday.core.repositories
{
    public interface IFoodRepository:IRepository<Food>
    {
        System.Collections.Generic.IList<Food> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<Food> Search(System.Collections.Generic.List<DataFilter> termList, System.Collections.Generic.List<Restaurant> shopList, int start, int limit);
        System.Collections.Generic.IList<Food> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}
