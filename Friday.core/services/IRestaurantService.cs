using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IRestaurantService
    {
        Restaurant Load(string id);
        void Save(Restaurant restaurant);
        void Update(Restaurant restaurant);
        void Delete(string id);
        Restaurant SearchByShortName(string name);
        IList<Restaurant> Search(List<DataFilter> termList);
        IList<Restaurant> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
