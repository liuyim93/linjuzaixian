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
    public class ScoreOfItemInFoodOrderService : IScoreOfItemInFoodOrderService
    {
        private IScoreOfItemInFoodOrderRepository iScoreOfItemInFoodOrderRepository;
        private ILogger iLogger;
        public ScoreOfItemInFoodOrderService(IScoreOfItemInFoodOrderRepository iScoreOfItemInFoodOrderRepository, ILogger iLogger)
        {
            this.iScoreOfItemInFoodOrderRepository = iScoreOfItemInFoodOrderRepository;
            this.iLogger = iLogger;
        }
        public ScoreOfItemInFoodOrder Load(string id)
        {
            return iScoreOfItemInFoodOrderRepository.Load(id);
        }

        public void Save(ScoreOfItemInFoodOrder scoreOfItemInFoodOrder)
        {
            iLogger.LogMessage("插入ScoreOfItemInFoodOrder数据，ID：" + scoreOfItemInFoodOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInFoodOrderRepository.SaveOrUpdate(scoreOfItemInFoodOrder);
        }

        public void Update(ScoreOfItemInFoodOrder scoreOfItemInFoodOrder)
        {
            iLogger.LogMessage("更新ScoreOfItemInFoodOrder数据，ID：" + scoreOfItemInFoodOrder.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInFoodOrderRepository.SaveOrUpdate(scoreOfItemInFoodOrder);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ScoreOfItemInFoodOrder数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iScoreOfItemInFoodOrderRepository.Delete(id);
        }


        public IList<ScoreOfItemInFoodOrder> Search(List<DataFilter> termList)
        {
            return iScoreOfItemInFoodOrderRepository.Search(termList);
        }

        public IList<ScoreOfItemInFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iScoreOfItemInFoodOrderRepository.Search(termList, start, limit, out total);
        }
    }
}
