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
    public class MerchantGoodsTypeService:IMerchantGoodsTypeService
    {
        private IMerchantGoodsTypeRepository iMerchantGoodsTypeRepository;
        private ILogger iLogger;
        public MerchantGoodsTypeService(IMerchantGoodsTypeRepository iMerchantGoodsTypeRepository, ILogger iLogger)
        {
            this.iMerchantGoodsTypeRepository = iMerchantGoodsTypeRepository;
            this.iLogger = iLogger;
        }
        public MerchantGoodsType Load(string id)
        {
            return iMerchantGoodsTypeRepository.Load(id);
        }

        public void Save(MerchantGoodsType merchantGoodsType)
        {
            iLogger.LogMessage("插入MerchantGoodsType数据，ID：" + merchantGoodsType.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantGoodsTypeRepository.SaveOrUpdate(merchantGoodsType);
        }

        public void Update(MerchantGoodsType merchantGoodsType)
        {
            iLogger.LogMessage("更新MerchantGoodsType数据，ID：" + merchantGoodsType.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantGoodsTypeRepository.SaveOrUpdate(merchantGoodsType);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除MerchantGoodsType数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iMerchantGoodsTypeRepository.Delete(id);
        }

        public IList<MerchantGoodsType> Search(List<DataFilter> termList)
        {
            return iMerchantGoodsTypeRepository.Search(termList);
        }

        public IList<MerchantGoodsType> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iMerchantGoodsTypeRepository.Search(termList, start, limit, out total);
        }
        public IList<MerchantGoodsType> GetGoodsTypeByMerchantID(string mid) 
        {
            return iMerchantGoodsTypeRepository.GetGoodsTypeByMerchantID(mid);
        }
        public MerchantGoodsType GetGoodsTypeByTypeNameAndMerchantID(string mname, string mid) 
        {
            return iMerchantGoodsTypeRepository.GetGoodsTypeByTypeNameAndMerchantID(mname,mid);
        }
        public bool IsHaveTheSameName(string name)
        {
            return iMerchantGoodsTypeRepository.IsHaveTheSameName(name);
        }
        public IList<MerchantGoodsType> GetAll()
        {
            return iMerchantGoodsTypeRepository.GetAll();
        }
    }
}
