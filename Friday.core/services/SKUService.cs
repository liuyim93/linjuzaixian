using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.domain;

namespace friday.core.services
{
    public class SKUService:ISKUService
    {
        private ISKURepository iSKURepository;
        private ILogger iLogger;

        public SKUService(ISKURepository iSKURepository, ILogger iLogger)
        {
            this.iSKURepository = iSKURepository;
            this.iLogger = iLogger;
        }

        public IList<SKU> GetSKUsByCommodityID(string commodityID, int start, int limit, out long total)
        {
            return iSKURepository.GetSKUsByCommodityID(commodityID, start, limit, out total);
        }

        public SKU Load(string id)
        {
            return iSKURepository.Load(id);
        }

        public void Save(SKU sku)
        {
            iLogger.LogMessage("插入SKU数据，ID：" + sku.skuId, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSKURepository.SaveOrUpdate(sku);
        }

        public void Update(SKU sku)
        {
            iLogger.LogMessage("更新SKU数据，ID：" + sku.skuId, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSKURepository.SaveOrUpdate(sku);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除SKU数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSKURepository.Delete(id);
        }
    }
}
