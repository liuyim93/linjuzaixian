using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class RentStatisticService:IRentStatisticService
    {
        private IRentStatisticRepository iRentStatisticRepository;
        private ILogger iLogger;
        public RentStatisticService(IRentStatisticRepository iRentStatisticRepository, ILogger iLogger)
        {
            this.iRentStatisticRepository = iRentStatisticRepository;
            this.iLogger = iLogger;
        }
        public RentStatistic Load(string id)
        {
            return iRentStatisticRepository.Load(id);
        }

        public void Save(RentStatistic rentStatistic)
        {
            iLogger.LogMessage("插入RentStatistic数据，ID：" + rentStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRentStatisticRepository.SaveOrUpdate(rentStatistic);
        }

        public void Update(RentStatistic rentStatistic)
        {
            iLogger.LogMessage("更新RentStatistic数据，ID：" + rentStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRentStatisticRepository.SaveOrUpdate(rentStatistic);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除RentStatistic数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iRentStatisticRepository.Delete(id);
        }
       
        public IList<RentStatistic> Search(List<DataFilter> termList)
        {
            return iRentStatisticRepository.Search(termList);
        }
        public IList<RentStatistic> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iRentStatisticRepository.Search(termList, start, limit, out total);
        }

    }
}
