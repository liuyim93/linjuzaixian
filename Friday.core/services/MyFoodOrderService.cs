using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class MyFoodOrderService : IMyFoodOrderService
    {
        private IMyFoodOrderRepository iMyFoodOrderRepository;
        private ILogger iLogger;
        public MyFoodOrderService(IMyFoodOrderRepository iMyFoodOrderRepository, ILogger iLogger)
        {
            this.iMyFoodOrderRepository = iMyFoodOrderRepository;
            this.iLogger = iLogger;
        }
        public MyFoodOrder Load(string id)
        {
            return iMyFoodOrderRepository.Load(id);
        }

        public void Save(MyFoodOrder myFoodOrder)
        {
            iLogger.LogMessage("插入MyFoodOrder数据，ID：" + myFoodOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyFoodOrderRepository.SaveOrUpdate(myFoodOrder);
        }

        public void Update(MyFoodOrder myFoodOrder)
        {
            iLogger.LogMessage("更新MyFoodOrder数据，ID：" + myFoodOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyFoodOrderRepository.SaveOrUpdate(myFoodOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除MyFoodOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMyFoodOrderRepository.Delete(id);
        }

        public IList<MyFoodOrder> Search(List<DataFilter> termList)
        {
            return iMyFoodOrderRepository.Search(termList);
        }

        public IList<MyFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMyFoodOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
