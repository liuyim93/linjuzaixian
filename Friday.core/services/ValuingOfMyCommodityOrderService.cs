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
    public class ValuingOfMyCommodityOrderService : IValuingOfMyCommodityOrderService
    {
        private IValuingOfMyCommodityOrderRepository iValuingOfMyCommodityOrderRepository;
        private ILogger iLogger;

        public IList<ValuingOfMyCommodityOrder> GetValuingOfMyCommodityOrderByCommodityID(string commodityID)
        {
            return iValuingOfMyCommodityOrderRepository.GetValuingOfMyCommodityOrderByCommodityID(commodityID);
        }

        public ValuingOfMyCommodityOrderService(IValuingOfMyCommodityOrderRepository iValuingOfMyCommodityOrderRepository, ILogger iLogger)
        {
            this.iValuingOfMyCommodityOrderRepository = iValuingOfMyCommodityOrderRepository;
            this.iLogger = iLogger;
        }
        public ValuingOfMyCommodityOrder Load(string id)
        {
            return iValuingOfMyCommodityOrderRepository.Load(id);
        }

        public void Save(ValuingOfMyCommodityOrder valuingOfMyCommodityOrder)
        {
            iLogger.LogMessage("插入ValuingOfMyCommodityOrder数据，ID：" + valuingOfMyCommodityOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyCommodityOrderRepository.SaveOrUpdate(valuingOfMyCommodityOrder);
        }

        public void Update(ValuingOfMyCommodityOrder valuingOfMyCommodityOrder)
        {
            iLogger.LogMessage("更新ValuingOfMyCommodityOrder数据，ID：" + valuingOfMyCommodityOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyCommodityOrderRepository.SaveOrUpdate(valuingOfMyCommodityOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ValuingOfMyCommodityOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iValuingOfMyCommodityOrderRepository.Delete(id);
        }


        public IList<ValuingOfMyCommodityOrder> Search(List<DataFilter> termList)
        {
            return iValuingOfMyCommodityOrderRepository.Search(termList);
        }

        public IList<ValuingOfMyCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iValuingOfMyCommodityOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
