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
    public class ShopStatisticService:IShopStatisticService
    {
        private IShopStatisticRepository iShopStatisticRepository;
        private ILogger iLogger;
        public ShopStatisticService(IShopStatisticRepository iShopStatisticRepository, ILogger iLogger)
        {
            this.iShopStatisticRepository = iShopStatisticRepository;
            this.iLogger = iLogger;
        }
        public ShopStatistic Load(string id)
        {
            return iShopStatisticRepository.Load(id);
        }

        public void Save(ShopStatistic shopStatistic)
        {
            iLogger.LogMessage("插入ShopStatistic数据，ID：" + shopStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShopStatisticRepository.SaveOrUpdate(shopStatistic);
        }

        public void Update(ShopStatistic shopStatistic)
        {
            iLogger.LogMessage("更新ShopStatistic数据，ID：" + shopStatistic.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShopStatisticRepository.SaveOrUpdate(shopStatistic);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ShopStatistic数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShopStatisticRepository.Delete(id);
        }
       
        public IList<ShopStatistic> Search(List<DataFilter> termList)
        {
            return iShopStatisticRepository.Search(termList);
        }
        public IList<ShopStatistic> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iShopStatisticRepository.Search(termList, start, limit, out total);
        }

    }
}
