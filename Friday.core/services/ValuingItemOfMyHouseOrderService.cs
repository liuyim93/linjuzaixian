using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class ValuingItemOfMyHouseOrderService : IValuingItemOfMyHouseOrderService
    {
        private IValuingItemOfMyHouseOrderRepository iValuingItemOfMyHouseOrderRepository;
        private ILogger iLogger;
        public ValuingItemOfMyHouseOrderService(IValuingItemOfMyHouseOrderRepository iValuingItemOfMyHouseOrderRepository, ILogger iLogger)
        {
            this.iValuingItemOfMyHouseOrderRepository = iValuingItemOfMyHouseOrderRepository;
            this.iLogger = iLogger;
        }
        public ValuingItemOfMyHouseOrder Load(string id)
        {
            return iValuingItemOfMyHouseOrderRepository.Load(id);
        }

        public void Save(ValuingItemOfMyHouseOrder valuingItemOfMyHouseOrder)
        {
            iLogger.LogMessage("插入ValuingItemOfMyHouseOrder数据，ID：" + valuingItemOfMyHouseOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyHouseOrderRepository.SaveOrUpdate(valuingItemOfMyHouseOrder);
        }

        public void Update(ValuingItemOfMyHouseOrder valuingItemOfMyHouseOrder)
        {
            iLogger.LogMessage("更新ValuingItemOfMyHouseOrder数据，ID：" + valuingItemOfMyHouseOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyHouseOrderRepository.SaveOrUpdate(valuingItemOfMyHouseOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ValuingItemOfMyHouseOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyHouseOrderRepository.Delete(id);
        }
        public IList<ValuingItemOfMyHouseOrder> GetAll()
        {
            return iValuingItemOfMyHouseOrderRepository.GetAll();
        }

    }
}
