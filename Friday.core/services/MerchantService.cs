using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;

namespace friday.core.services
{
    public class MerchantService:IMerchantService
    {
        private IMerchantRepository iMerchantRepository;
        private ILogger iLogger;
        public MerchantService(IMerchantRepository iMerchantRepository, ILogger iLogger)
        {
            this.iMerchantRepository = iMerchantRepository;
            this.iLogger = iLogger;
        }
        public Merchant Load(string id)
        {
            return iMerchantRepository.Load(id);
        }

        public void Save(Merchant merchant)
        {
            iLogger.LogMessage("插入Merchant数据，ID：" + merchant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantRepository.SaveOrUpdate(merchant);
        }

        public void Update(Merchant merchant)
        {
            iLogger.LogMessage("更新Merchant数据，ID：" + merchant.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantRepository.SaveOrUpdate(merchant);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Merchant数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantRepository.Delete(id);
        }

        public IList<Merchant> Search(List<DataFilter> termList)
        {
            return iMerchantRepository.Search(termList);
        }

        public IList<Merchant> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMerchantRepository.Search(termList, start, limit, out total);
        }
    }
}
