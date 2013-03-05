using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class RestaurantStatisticService:IRestaurantStatisticService
    {
        private IRestaurantStatisticRepository iRestaurantStatisticRepository;
        private ILogger iLogger;
        public RestaurantStatisticService(IRestaurantStatisticRepository iRestaurantStatisticRepository, ILogger iLogger)
        {
            this.iRestaurantStatisticRepository = iRestaurantStatisticRepository;
            this.iLogger = iLogger;
        }
        public RestaurantStatistic Load(string id)
        {
            return iRestaurantStatisticRepository.Load(id);
        }

        public void Save(RestaurantStatistic restaurantStatistic)
        {
            iLogger.LogMessage("插入RestaurantStatistic数据，ID：" + restaurantStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRestaurantStatisticRepository.SaveOrUpdate(restaurantStatistic);
        }

        public void Update(RestaurantStatistic restaurantStatistic)
        {
            iLogger.LogMessage("更新RestaurantStatistic数据，ID：" + restaurantStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRestaurantStatisticRepository.SaveOrUpdate(restaurantStatistic);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除RestaurantStatistic数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRestaurantStatisticRepository.Delete(id);
        }
       
        public IList<RestaurantStatistic> Search(List<DataFilter> termList)
        {
            return iRestaurantStatisticRepository.Search(termList);
        }
        public IList<RestaurantStatistic> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iRestaurantStatisticRepository.Search(termList, start, limit, out total);
        }

    }
}
