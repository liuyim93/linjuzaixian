using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;

namespace friday.core.services
{
    public class CommodityStatisticService:ICommodityStatisticService
    {
        private ICommodityStatisticRepository iCommodityStatisticRepository;
        private ILogger iLogger;
        public CommodityStatisticService(ICommodityStatisticRepository iCommodityStatisticRepository, ILogger iLogger)
        {
            this.iCommodityStatisticRepository = iCommodityStatisticRepository;
            this.iLogger = iLogger;
        }
        public CommodityStatistic Load(string id)
        {
            return iCommodityStatisticRepository.Load(id);
        }

        public void Save(CommodityStatistic commodityStatistic)
        {
            iLogger.LogMessage("插入CommodityStatistic数据，ID：" + commodityStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCommodityStatisticRepository.SaveOrUpdate(commodityStatistic);
        }

        public void Update(CommodityStatistic commodityStatistic)
        {
            iLogger.LogMessage("更新CommodityStatistic数据，ID：" + commodityStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCommodityStatisticRepository.SaveOrUpdate(commodityStatistic);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除CommodityStatistic数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCommodityStatisticRepository.Delete(id);
        }

        public IList<CommodityStatistic> Search(List<DataFilter> termList)
        {
            return iCommodityStatisticRepository.Search(termList);
        }

        public IList<CommodityStatistic> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iCommodityStatisticRepository.Search(termList, start, limit, out total);
        }
    }
}
