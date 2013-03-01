using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;

namespace friday.core.services
{
    public class RestaurantService:IRestaurantService
    {
        IRestaurantRepository iRestaurantRepository =UnityHelper.UnityToT<IRestaurantRepository>();
        ILogger iLogger = UnityHelper.UnityToT<ILogger>();

        public void Save(Restaurant restaurant)
        {
            iLogger.LogMessage("插入Restaurant数据，ID：" + restaurant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRestaurantRepository.SaveOrUpdate(restaurant);
        }

        public void Update(Restaurant restaurant)
        {
            iLogger.LogMessage("更新Restaurant数据，ID：" + restaurant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRestaurantRepository.SaveOrUpdate(restaurant);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Restaurant数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRestaurantRepository.Delete(id);
        }

        public Restaurant SearchByShortName(string name)
        {
            return iRestaurantRepository.SearchByShortName(name);
        }

        public IList<Restaurant> Search(List<DataFilter> termList)
        {
            return iRestaurantRepository.Search(termList);
        }

        public IList<Restaurant> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iRestaurantRepository.Search(termList, start, limit, out total);
        }
    }
}
