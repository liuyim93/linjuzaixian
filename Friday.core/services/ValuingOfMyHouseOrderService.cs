using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class ValuingOfMyHouseOrderService : IValuingOfMyHouseOrderService
    {
        private IValuingOfMyHouseOrderRepository iValuingOfMyHouseOrderRepository;
        private ILogger iLogger;

        public IList<ValuingOfMyHouseOrder> GetValuingOfMyHouseOrderByHouseID(string houseID)
        {
            return iValuingOfMyHouseOrderRepository.GetValuingOfMyHouseOrderByHouseID(houseID);
        }


        public ValuingOfMyHouseOrderService(IValuingOfMyHouseOrderRepository iValuingOfMyHouseOrderRepository, ILogger iLogger)
        {
            this.iValuingOfMyHouseOrderRepository = iValuingOfMyHouseOrderRepository;
            this.iLogger = iLogger;
        }
        public ValuingOfMyHouseOrder Load(string id)
        {
            return iValuingOfMyHouseOrderRepository.Load(id);
        }

        public void Save(ValuingOfMyHouseOrder valuingOfMyHouseOrder)
        {
            iLogger.LogMessage("插入ValuingOfMyHouseOrder数据，ID：" + valuingOfMyHouseOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyHouseOrderRepository.SaveOrUpdate(valuingOfMyHouseOrder);
        }

        public void Update(ValuingOfMyHouseOrder valuingOfMyHouseOrder)
        {
            iLogger.LogMessage("更新ValuingOfMyHouseOrder数据，ID：" + valuingOfMyHouseOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyHouseOrderRepository.SaveOrUpdate(valuingOfMyHouseOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ValuingOfMyHouseOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyHouseOrderRepository.Delete(id);
        }


        public IList<ValuingOfMyHouseOrder> Search(List<DataFilter> termList)
        {
            return iValuingOfMyHouseOrderRepository.Search(termList);
        }

        public IList<ValuingOfMyHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iValuingOfMyHouseOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
