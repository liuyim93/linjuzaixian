using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;

namespace friday.core.services
{
    public class HouseStatisticService:IHouseStatisticService
    {
        private IHouseStatisticRepository iHouseStatisticRepository;
        private ILogger iLogger;
        public HouseStatisticService(IHouseStatisticRepository iHouseStatisticRepository, ILogger iLogger)
        {
            this.iHouseStatisticRepository = iHouseStatisticRepository;
            this.iLogger = iLogger;
        }
        public HouseStatistic Load(string id)
        {
            return iHouseStatisticRepository.Load(id);
        }

        public void Save(HouseStatistic houseStatistic)
        {
            iLogger.LogMessage("插入HouseStatistic数据，ID：" + houseStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iHouseStatisticRepository.SaveOrUpdate(houseStatistic);
        }

        public void Update(HouseStatistic houseStatistic)
        {
            iLogger.LogMessage("更新HouseStatistic数据，ID：" + houseStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iHouseStatisticRepository.SaveOrUpdate(houseStatistic);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除HouseStatistic数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iHouseStatisticRepository.Delete(id);
        }

        public IList<HouseStatistic> Search(List<DataFilter> termList)
        {
            return iHouseStatisticRepository.Search(termList);
        }

        public IList<HouseStatistic> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iHouseStatisticRepository.Search(termList, start, limit, out total);
        }
    }
}
