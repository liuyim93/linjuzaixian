using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IFoodService
    {
        Food Load(string id);
        void Save(Food food);
        void Update(Food food);
        void Delete(string id);
        IList<Food> Search(List<DataFilter> termList);
        IList<Food> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<Food> Search(List<DataFilter> termList, List<Restaurant> restaurantList, int start, int limit);
    }
}
