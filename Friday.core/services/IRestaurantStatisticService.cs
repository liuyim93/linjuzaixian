using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IRestaurantStatisticService
    {
        RestaurantStatistic Load(string id);
        void Save(RestaurantStatistic restaurantStatistic);
        void Update(RestaurantStatistic restaurantStatistic);
        void Delete(string id);
        IList<RestaurantStatistic> Search(List<DataFilter> termList);
        IList<RestaurantStatistic> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
