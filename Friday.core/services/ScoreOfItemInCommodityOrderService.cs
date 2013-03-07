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
    public class ScoreOfItemInCommodityOrderService : IScoreOfItemInCommodityOrderService
    {
        private IScoreOfItemInCommodityOrderRepository iScoreOfItemInCommodityOrderRepository;
        private ILogger iLogger;
        public ScoreOfItemInCommodityOrderService(IScoreOfItemInCommodityOrderRepository iScoreOfItemInCommodityOrderRepository, ILogger iLogger)
        {
            this.iScoreOfItemInCommodityOrderRepository = iScoreOfItemInCommodityOrderRepository;
            this.iLogger = iLogger;
        }
        public ScoreOfItemInCommodityOrder Load(string id)
        {
            return iScoreOfItemInCommodityOrderRepository.Load(id);
        }


        public int GetScoreOfItemInCommodityOrdersCount(string valuingOfMyCommodityOrderID)
        {
            return iScoreOfItemInCommodityOrderRepository.GetScoreOfItemInCommodityOrdersCount(valuingOfMyCommodityOrderID);
        }

        public double GetScoreOfItemInCommodityOrdersSum(string valuingOfMyCommodityOrderID)
        {
            return iScoreOfItemInCommodityOrderRepository.GetScoreOfItemInCommodityOrdersSum(valuingOfMyCommodityOrderID);
        }

        public void Save(ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder)
        {
            iLogger.LogMessage("插入ScoreOfItemInCommodityOrder数据，ID：" + scoreOfItemInCommodityOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInCommodityOrderRepository.SaveOrUpdate(scoreOfItemInCommodityOrder);
        }

        public void Update(ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder)
        {
            iLogger.LogMessage("更新ScoreOfItemInCommodityOrder数据，ID：" + scoreOfItemInCommodityOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInCommodityOrderRepository.SaveOrUpdate(scoreOfItemInCommodityOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ScoreOfItemInCommodityOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInCommodityOrderRepository.Delete(id);
        }


        public IList<ScoreOfItemInCommodityOrder> Search(List<DataFilter> termList)
        {
            return iScoreOfItemInCommodityOrderRepository.Search(termList);
        }

        public IList<ScoreOfItemInCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iScoreOfItemInCommodityOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
