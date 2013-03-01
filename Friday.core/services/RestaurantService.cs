using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;

namespace friday.core.services
{
    class RestaurantService:IRestaurantService
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

    }
}
