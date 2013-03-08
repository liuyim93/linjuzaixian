using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class ValuingItemOfMyFoodOrderService : IValuingItemOfMyFoodOrderService
    {
        private IValuingItemOfMyFoodOrderRepository iValuingItemOfMyFoodOrderRepository;
        private ILogger iLogger;
        public ValuingItemOfMyFoodOrderService(IValuingItemOfMyFoodOrderRepository iValuingItemOfMyFoodOrderRepository, ILogger iLogger)
        {
            this.iValuingItemOfMyFoodOrderRepository = iValuingItemOfMyFoodOrderRepository;
            this.iLogger = iLogger;
        }
        public ValuingItemOfMyFoodOrder Load(string id)
        {
            return iValuingItemOfMyFoodOrderRepository.Load(id);
        }

        public void Save(ValuingItemOfMyFoodOrder valuingItemOfMyFoodOrder)
        {
            iLogger.LogMessage("插入ValuingItemOfMyFoodOrder数据，ID：" + valuingItemOfMyFoodOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyFoodOrderRepository.SaveOrUpdate(valuingItemOfMyFoodOrder);
        }

        public void Update(ValuingItemOfMyFoodOrder valuingItemOfMyFoodOrder)
        {
            iLogger.LogMessage("更新ValuingItemOfMyFoodOrder数据，ID：" + valuingItemOfMyFoodOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyFoodOrderRepository.SaveOrUpdate(valuingItemOfMyFoodOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ValuingItemOfMyFoodOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingItemOfMyFoodOrderRepository.Delete(id);
        }
        public IList<ValuingItemOfMyFoodOrder> GetAll()
        {
            return iValuingItemOfMyFoodOrderRepository.GetAll();
        }

    }
}
