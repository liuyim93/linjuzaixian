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
    public class CommodityService:ICommodityService
    {
        private ICommodityRepository iCommodityRepository;
        private ILogger iLogger;
        public CommodityService(ICommodityRepository iCommodityRepository, ILogger iLogger)
        {
            this.iCommodityRepository = iCommodityRepository;
            this.iLogger = iLogger;
        }

        public IList<Commodity> GetCommodityByShopIDOrderByMonthAmountDesc(string shopID)
        {
            return iCommodityRepository.GetCommodityByShopIDOrderByMonthAmountDesc(shopID);
        }

        public Commodity Load(string id)
        {
            return iCommodityRepository.Load(id);
        }

        public void Save(Commodity commodity)
        {
            iLogger.LogMessage("插入Commodity数据，ID：" + commodity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCommodityRepository.SaveOrUpdate(commodity);
        }

        public void Update(Commodity commodity)
        {
            iLogger.LogMessage("更新Commodity数据，ID：" + commodity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCommodityRepository.SaveOrUpdate(commodity);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Commodity数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCommodityRepository.Delete(id);
        }

        public IList<Commodity> Search(List<DataFilter> termList)
        {
            return iCommodityRepository.Search(termList);
        }

        public IList<Commodity> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iCommodityRepository.Search(termList, start, limit, out total);
        }
    }
}
