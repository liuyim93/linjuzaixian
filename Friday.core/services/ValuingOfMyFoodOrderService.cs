using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class ValuingOfMyFoodOrderService : IValuingOfMyFoodOrderService
    {
        private IValuingOfMyFoodOrderRepository iValuingOfMyFoodOrderRepository;
        private ILogger iLogger;
        public IList<ValuingOfMyFoodOrder> GetValuingOfMyFoodOrderByFoodID(string foodID)
        {
            return iValuingOfMyFoodOrderRepository.GetValuingOfMyFoodOrderByFoodID(foodID);
        }
        public ValuingOfMyFoodOrderService(IValuingOfMyFoodOrderRepository iValuingOfMyFoodOrderRepository, ILogger iLogger)
        {
            this.iValuingOfMyFoodOrderRepository = iValuingOfMyFoodOrderRepository;
            this.iLogger = iLogger;
        }
        public ValuingOfMyFoodOrder Load(string id)
        {
            return iValuingOfMyFoodOrderRepository.Load(id);
        }

        public void Save(ValuingOfMyFoodOrder valuingOfMyFoodOrder)
        {
            iLogger.LogMessage("插入ValuingOfMyFoodOrder数据，ID：" + valuingOfMyFoodOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyFoodOrderRepository.SaveOrUpdate(valuingOfMyFoodOrder);
        }

        public void Update(ValuingOfMyFoodOrder valuingOfMyFoodOrder)
        {
            iLogger.LogMessage("更新ValuingOfMyFoodOrder数据，ID：" + valuingOfMyFoodOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyFoodOrderRepository.SaveOrUpdate(valuingOfMyFoodOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ValuingOfMyFoodOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyFoodOrderRepository.Delete(id);
        }


        public IList<ValuingOfMyFoodOrder> Search(List<DataFilter> termList)
        {
            return iValuingOfMyFoodOrderRepository.Search(termList);
        }

        public IList<ValuingOfMyFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iValuingOfMyFoodOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
