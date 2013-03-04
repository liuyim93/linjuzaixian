using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;

namespace friday.core.services
{
    public class FoodStatisticService:IFoodStatisticService
    {
        private IFoodStatisticRepository iFoodStatisticRepository;
        private ILogger iLogger;
        public FoodStatisticService(IFoodStatisticRepository iFoodStatisticRepository, ILogger iLogger)
        {
            this.iFoodStatisticRepository = iFoodStatisticRepository;
            this.iLogger = iLogger;
        }
        public FoodStatistic Load(string id)
        {
            return iFoodStatisticRepository.Load(id);
        }

        public void Save(FoodStatistic foodStatistic)
        {
            iLogger.LogMessage("插入FoodStatistic数据，ID：" + foodStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFoodStatisticRepository.SaveOrUpdate(foodStatistic);
        }

        public void Update(FoodStatistic foodStatistic)
        {
            iLogger.LogMessage("更新FoodStatistic数据，ID：" + foodStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFoodStatisticRepository.SaveOrUpdate(foodStatistic);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除FoodStatistic数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFoodStatisticRepository.Delete(id);
        }        

        //public IList<FoodStatistic> Search(List<DataFilter> termList)
        //{
        //    return iFoodStatisticRepository.Search(termList);
        //}

        //public IList<FoodStatistic> Search(List<DataFilter> termList, int start, int limit, out long total)
        //{
        //    return iFoodStatisticRepository.Search(termList, start, limit, out total);
        //}
    }
}
