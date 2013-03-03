using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;
using friday.core.utils;
using friday.core.components;

namespace friday.core.services
{
    public class MerchantCategoryService : IMerchantCategoryService
    {
        private IMerchantCategoryRepository iMerchantCategoryRepository;
        private ILogger iLogger;
        public MerchantCategoryService(IMerchantCategoryRepository iMerchantCategoryRepository, ILogger iLogger)
        {
            this.iMerchantCategoryRepository = iMerchantCategoryRepository;
            this.iLogger = iLogger;
        }
        public MerchantCategory Load(string id)
        {
            return iMerchantCategoryRepository.Load(id);
        }

        public void Save(MerchantCategory merchantCategory)
        {
            iLogger.LogMessage("插入MerchantCategory数据，ID：" + merchantCategory.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantCategoryRepository.SaveOrUpdate(merchantCategory);
        }

        public void Update(MerchantCategory merchantCategory)
        {
            iLogger.LogMessage("更新MerchantCategory数据，ID：" + merchantCategory.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantCategoryRepository.SaveOrUpdate(merchantCategory);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除MerchantCategory数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantCategoryRepository.Delete(id);
        }

        public MerchantCategory SearchByMerchantCategoryName(string name)
        {
            return iMerchantCategoryRepository.SearchByMerchantCategoryName(name);
        }

        public IList<MerchantCategory> Search(List<DataFilter> termList)
        {
            return iMerchantCategoryRepository.Search(termList);
        }

        public IList<MerchantCategory> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMerchantCategoryRepository.Search(termList, start, limit, out total);
        }
    }
}
