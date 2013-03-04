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
    public class MyCommodityOrderService:IMyCommodityOrderService
    {
        private IMyCommodityOrderRepository iMyCommodityOrderRepository;
        private ILogger iLogger;
        public MyCommodityOrderService(IMyCommodityOrderRepository iMyCommodityOrderRepository, ILogger iLogger)
        {
            this.iMyCommodityOrderRepository = iMyCommodityOrderRepository;
            this.iLogger = iLogger;
        }
        public MyCommodityOrder Load(string id)
        {
            return iMyCommodityOrderRepository.Load(id);
        }

        public void Save(MyCommodityOrder myCommodityOrder)
        {
            iLogger.LogMessage("插入MyCommodityOrder数据，ID：" + myCommodityOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyCommodityOrderRepository.SaveOrUpdate(myCommodityOrder);
        }

        public void Update(MyCommodityOrder myCommodityOrder)
        {
            iLogger.LogMessage("更新MyCommodityOrder数据，ID：" + myCommodityOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyCommodityOrderRepository.SaveOrUpdate(myCommodityOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除MyCommodityOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyCommodityOrderRepository.Delete(id);
        }

        public IList<MyCommodityOrder> Search(List<DataFilter> termList)
        {
            return iMyCommodityOrderRepository.Search(termList);
        }

        public IList<MyCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMyCommodityOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
