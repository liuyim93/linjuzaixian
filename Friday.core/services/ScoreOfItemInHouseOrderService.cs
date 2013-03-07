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
    public class ScoreOfItemInHouseOrderService : IScoreOfItemInHouseOrderService
    {
        private IScoreOfItemInHouseOrderRepository iScoreOfItemInHouseOrderRepository;
        private ILogger iLogger;
        public ScoreOfItemInHouseOrderService(IScoreOfItemInHouseOrderRepository iScoreOfItemInHouseOrderRepository, ILogger iLogger)
        {
            this.iScoreOfItemInHouseOrderRepository = iScoreOfItemInHouseOrderRepository;
            this.iLogger = iLogger;
        }
        public ScoreOfItemInHouseOrder Load(string id)
        {
            return iScoreOfItemInHouseOrderRepository.Load(id);
        }

        public int GetScoreOfItemInHouseOrdersCount(string valuingOfMyHouseOrderID)
        {
            return iScoreOfItemInHouseOrderRepository.GetScoreOfItemInHouseOrdersCount(valuingOfMyHouseOrderID);
        }

        public void Save(ScoreOfItemInHouseOrder scoreOfItemInHouseOrder)
        {
            iLogger.LogMessage("插入ScoreOfItemInHouseOrder数据，ID：" + scoreOfItemInHouseOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInHouseOrderRepository.SaveOrUpdate(scoreOfItemInHouseOrder);
        }

        public void Update(ScoreOfItemInHouseOrder scoreOfItemInHouseOrder)
        {
            iLogger.LogMessage("更新ScoreOfItemInHouseOrder数据，ID：" + scoreOfItemInHouseOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInHouseOrderRepository.SaveOrUpdate(scoreOfItemInHouseOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ScoreOfItemInHouseOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInHouseOrderRepository.Delete(id);
        }


        public IList<ScoreOfItemInHouseOrder> Search(List<DataFilter> termList)
        {
            return iScoreOfItemInHouseOrderRepository.Search(termList);
        }

        public IList<ScoreOfItemInHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iScoreOfItemInHouseOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
