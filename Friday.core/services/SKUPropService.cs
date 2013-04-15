using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.domain;

namespace friday.core.services
{
    public class SKUPropService:ISKUPropService
    {
        private ISKUPropRepository iSKUPropRepository;
        private ILogger iLogger;

        public SKUPropService(ISKUPropRepository iSKUPropRepository, ILogger iLogger)
        {
            this.iSKUPropRepository = iSKUPropRepository;
            this.iLogger = iLogger;
        }

        public SKUProp Load(string id)
        {
            return iSKUPropRepository.Load(id);
        }

        public void Save(SKUProp skuProp)
        {
            iLogger.LogMessage("插入SKUProp数据，ID：" + skuProp.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSKUPropRepository.SaveOrUpdate(skuProp);
        }

        public void Update(SKUProp skuProp)
        {
            iLogger.LogMessage("更新SKUProp数据，ID：" + skuProp.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSKUPropRepository.SaveOrUpdate(skuProp);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除SKUProp数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSKUPropRepository.Delete(id);
        }
    }
}
