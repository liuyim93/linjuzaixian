using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public class OrderOfCommodityService:IOrderOfCommodityService
    {
        private IOrderOfCommodityRepository iOrderOfCommodityRepository;
        private ILogger iLogger;
        public OrderOfCommodityService(IOrderOfCommodityRepository iOrderOfCommodityRepository, ILogger iLogger)
        {
            this.iOrderOfCommodityRepository = iOrderOfCommodityRepository;
            this.iLogger = iLogger;
        }
        public OrderOfCommodity Load(string id)
        {
            return iOrderOfCommodityRepository.Load(id);
        }

        public void Save(OrderOfCommodity orderOfCommodity)
        {
            iLogger.LogMessage("插入OrderOfCommodity数据，ID：" + orderOfCommodity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfCommodityRepository.SaveOrUpdate(orderOfCommodity);
        }

        public void Update(OrderOfCommodity orderOfCommodity)
        {
            iLogger.LogMessage("更新OrderOfCommodity数据，ID：" + orderOfCommodity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfCommodityRepository.SaveOrUpdate(orderOfCommodity);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除OrderOfCommodity数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iOrderOfCommodityRepository.Delete(id);
        }

        public IList<OrderOfCommodity> Search(List<DataFilter> termList)
        {
            return iOrderOfCommodityRepository.Search(termList);
        }

        public IList<OrderOfCommodity> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iOrderOfCommodityRepository.Search(termList, start, limit, out total);
        }

        public List<OrderOfCommodity> geOrderOfCommoditysByMyCommodityOrderID(string MyCommodityOrderID)
        {
            return iOrderOfCommodityRepository.geOrderOfCommoditysByMyCommodityOrderID(MyCommodityOrderID);
        }
    }
}
