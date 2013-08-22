using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.services
{
    public class ShopService:IShopService
    {
        private IShopRepository iShopRepository;
        private ILogger iLogger;
        public ShopService(IShopRepository iShopRepository, ILogger iLogger)
        {
            this.iShopRepository = iShopRepository;
            this.iLogger = iLogger;
        }
        public Shop Load(string id)
        {
            return iShopRepository.Load(id);
        }

        public void Save(Shop shop)
        {
            iLogger.LogMessage("插入Shop数据，ID：" + shop.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShopRepository.SaveOrUpdate(shop);
        }

        public void Update(Shop shop)
        {
            iLogger.LogMessage("更新Shop数据，ID：" + shop.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShopRepository.SaveOrUpdate(shop);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Shop数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShopRepository.Delete(id);
        }

        public Shop SearchByShortName(string name)
        {
            return iShopRepository.SearchByShortName(name);
        }

        public IList<Shop> Search(List<DataFilter> termList)
        {
            return iShopRepository.Search(termList);
        }

        public IList<Shop> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iShopRepository.Search(termList, start, limit, out total);
        }
        public IList<Shop> GetAll()
        {
            return iShopRepository.GetAll();
        }
        public IList<Shop> GetShopsByMerchantType(MerchantTypeEnum mTP)
        {
            return iShopRepository.GetShopsByMerchantType(mTP);
        }
        public IList<Shop> GetShopsBySchoolID(string SchoolID)
        {
            return iShopRepository.GetShopsBySchoolID(SchoolID);
        }


    }
}
