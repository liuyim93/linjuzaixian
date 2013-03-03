using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public class OrderOfFoodService : IOrderOfFoodService
    {
        private IOrderOfFoodRepository iOrderOfFoodRepository;
        private ILogger iLogger;
        public OrderOfFoodService(IOrderOfFoodRepository iOrderOfFoodRepository, ILogger iLogger)
        {
            this.iOrderOfFoodRepository = iOrderOfFoodRepository;
            this.iLogger = iLogger;
        }
        public OrderOfFood Load(string id)
        {
            return iOrderOfFoodRepository.Load(id);
        }

        public void Save(OrderOfFood orderOfFood)
        {
            iLogger.LogMessage("插入OrderOfFood数据，ID：" + orderOfFood.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfFoodRepository.SaveOrUpdate(orderOfFood);
        }

        public void Update(OrderOfFood orderOfFood)
        {
            iLogger.LogMessage("更新OrderOfFood数据，ID：" + orderOfFood.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfFoodRepository.SaveOrUpdate(orderOfFood);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除OrderOfFood数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfFoodRepository.Delete(id);
        }

        public IList<OrderOfFood> Search(List<DataFilter> termList)
        {
            return iOrderOfFoodRepository.Search(termList);
        }

        public IList<OrderOfFood> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iOrderOfFoodRepository.Search(termList, start, limit, out total);
        }
    }
}
