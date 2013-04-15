using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.domain;

namespace friday.core.services
{
    public class SkuPropService : ISkuPropService
    {
        private ISkuPropRepository iSkuPropRepository;
        private ILogger iLogger;

        public SkuPropService(ISkuPropRepository iSkuPropRepository, ILogger iLogger)
        {
            this.iSkuPropRepository = iSkuPropRepository;
            this.iLogger = iLogger;
        }

        public IList<SkuProp> GetSkuPropsBySkuID(string Sku_ID, int start, int limit, out long total)
        {
            return iSkuPropRepository.GetSkuPropsBySkuID(Sku_ID, start, limit, out total);
        }

        public SkuProp Load(string id)
        {
            return iSkuPropRepository.Load(id);
        }

        public void Save(SkuProp skuProp)
        {
            iLogger.LogMessage("插入SkuProp数据，ID：" + skuProp.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSkuPropRepository.SaveOrUpdate(skuProp);
        }

        public void Update(SkuProp skuProp)
        {
            iLogger.LogMessage("更新SkuProp数据，ID：" + skuProp.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSkuPropRepository.SaveOrUpdate(skuProp);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除SkuProp数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSkuPropRepository.Delete(id);
        }

        public SkuProp getSkuPropbyIntID(string id)
        {
            return iSkuPropRepository.getSkuPropbyIntID(id);
        }
    }
}