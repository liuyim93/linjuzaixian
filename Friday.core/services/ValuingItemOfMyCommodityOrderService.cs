using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class ValuingItemOfMyCommodityOrderService : IValuingItemOfMyCommodityOrderService
    {
        private IValuingItemOfMyCommodityOrderRepository iValuingItemOfMyCommodityOrderRepository;
        private ILogger iLogger;
        public ValuingItemOfMyCommodityOrderService(IValuingItemOfMyCommodityOrderRepository iValuingItemOfMyCommodityOrderRepository, ILogger iLogger)
        {
            this.iValuingItemOfMyCommodityOrderRepository = iValuingItemOfMyCommodityOrderRepository;
            this.iLogger = iLogger;
        }
        public ValuingItemOfMyCommodityOrder Load(string id)
        {
            return iValuingItemOfMyCommodityOrderRepository.Load(id);
        }

        public void Save(ValuingItemOfMyCommodityOrder valuingItemOfMyCommodityOrder)
        {
            iLogger.LogMessage("插入ValuingItemOfMyCommodityOrder数据，ID：" + valuingItemOfMyCommodityOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyCommodityOrderRepository.SaveOrUpdate(valuingItemOfMyCommodityOrder);
        }

        public void Update(ValuingItemOfMyCommodityOrder valuingItemOfMyCommodityOrder)
        {
            iLogger.LogMessage("更新ValuingItemOfMyCommodityOrder数据，ID：" + valuingItemOfMyCommodityOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyCommodityOrderRepository.SaveOrUpdate(valuingItemOfMyCommodityOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ValuingItemOfMyCommodityOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyCommodityOrderRepository.Delete(id);
        }
        public IList<ValuingItemOfMyCommodityOrder> GetAll()
        {
            return iValuingItemOfMyCommodityOrderRepository.GetAll();
        }

    }
}
