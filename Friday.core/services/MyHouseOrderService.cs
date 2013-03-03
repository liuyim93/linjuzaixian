using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class MyHouseOrderService : IMyHouseOrderService
    {
        private IMyHouseOrderRepository iMyHouseOrderRepository;
        private ILogger iLogger;
        public MyHouseOrderService(IMyHouseOrderRepository iMyHouseOrderRepository, ILogger iLogger)
        {
            this.iMyHouseOrderRepository = iMyHouseOrderRepository;
            this.iLogger = iLogger;
        }
        public MyHouseOrder Load(string id)
        {
            return iMyHouseOrderRepository.Load(id);
        }

        public void Save(MyHouseOrder myHouseOrder)
        {
            iLogger.LogMessage("插入MyHouseOrder数据，ID：" + myHouseOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyHouseOrderRepository.SaveOrUpdate(myHouseOrder);
        }

        public void Update(MyHouseOrder myHouseOrder)
        {
            iLogger.LogMessage("更新MyHouseOrder数据，ID：" + myHouseOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyHouseOrderRepository.SaveOrUpdate(myHouseOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除MyHouseOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyHouseOrderRepository.Delete(id);
        }

        public IList<MyHouseOrder> Search(List<DataFilter> termList)
        {
            return iMyHouseOrderRepository.Search(termList);
        }

        public IList<MyHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMyHouseOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
