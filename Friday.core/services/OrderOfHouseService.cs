using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class OrderOfHouseService : IOrderOfHouseService
    {
        private IOrderOfHouseRepository iOrderOfHouseRepository;
        private ILogger iLogger;
        public OrderOfHouseService(IOrderOfHouseRepository iOrderOfHouseRepository, ILogger iLogger)
        {
            this.iOrderOfHouseRepository = iOrderOfHouseRepository;
            this.iLogger = iLogger;
        }
        public OrderOfHouse Load(string id)
        {
            return iOrderOfHouseRepository.Load(id);
        }

        public void Save(OrderOfHouse orderOfHouse)
        {
            iLogger.LogMessage("插入OrderOfHouse数据，ID：" + orderOfHouse.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfHouseRepository.SaveOrUpdate(orderOfHouse);
        }

        public void Update(OrderOfHouse orderOfHouse)
        {
            iLogger.LogMessage("更新OrderOfHouse数据，ID：" + orderOfHouse.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfHouseRepository.SaveOrUpdate(orderOfHouse);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除OrderOfHouse数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfHouseRepository.Delete(id);
        }

        public IList<OrderOfHouse> Search(List<DataFilter> termList)
        {
            return iOrderOfHouseRepository.Search(termList);
        }

        public IList<OrderOfHouse> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iOrderOfHouseRepository.Search(termList, start, limit, out total);
        }
    }
}
