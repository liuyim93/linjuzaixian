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

        public IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType)
        {
            return iCommodityRepository.GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(shopID,keyword,price1,price2,orderType);
        }

        public IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string goodTypeId, string orderType, int start, int limit, out int total)
       {
           return iCommodityRepository.GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(shopID, keyword, price1, price2, goodTypeId, orderType, start, limit, out total);
       }

        public IList<Commodity> GetCommodityByShopIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string shopID, string merchantGoodTypeID, int start, int limit, out int total)
        {
            return iCommodityRepository.GetCommodityByShopIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(shopID,merchantGoodTypeID,start,limit,out total);
        }

        public IList<Commodity> GetCommodityByKeywordAndPrice(string page, string keyword, double price1, double price2, int start, int limit, out int total, string cat,string sort)
        {
            return iCommodityRepository.GetCommodityByKeywordAndPrice(page, keyword, price1, price2, start, limit, out total, cat,sort);
        }

        public IList<Commodity> GetCommodityByShopIDAndKeywordAndPrice(string shopID, string page, string keyword, double price1, double price2, int start, int limit, out int total, string sort)
        {
            return iCommodityRepository.GetCommodityByShopIDAndKeywordAndPrice(shopID, page, keyword, price1, price2, start, limit, out total, sort);
        }

        public IList<Commodity> GetCommodityByKeywordAndPrice(string page, string keyword, double price1, double price2, int start, int limit, out int total, string cat, string sort, string schoolId)
        {
            return iCommodityRepository.GetCommodityByKeywordAndPrice( page, keyword,  price1,  price2,  start,  limit, out total,  cat,  sort,  schoolId);
        }

        public int GetCommodityCountByFamily(string ParentID)
        {
            return iCommodityRepository.GetCommodityCountByFamily(ParentID);
        }

        public IList<Commodity> GetHotCommodity(int num)
        {
            return iCommodityRepository.GetHotCommodity(num);
        }

        public IList<Commodity> GetRecentCommodity(int num)
        {
            return iCommodityRepository.GetRecentCommodity(num);
        }

        public IList<Commodity> GetHotRecommendCommoditiesByKeyWord(string keyword)
        {
            return iCommodityRepository.GetHotRecommendCommoditiesByKeyWord(keyword);
        }

        public List<Commodity> GetCommodityByGoodsTypeAndSchoolID(string goodsTypeId, string schoolID)
        {
            return iCommodityRepository.GetCommodityByGoodsTypeAndSchoolID(goodsTypeId, schoolID);
        }

        public List<Commodity> GetCommodityBySchoolID(string schoolID)
        {
            return iCommodityRepository.GetCommodityBySchoolID(schoolID);
        }

        public IList<Commodity> GetCommodityByType(string page, double price1, double price2, int start, int limit, out int total, string sort, friday.core.EnumType.MerchantTypeEnum type)
        {
            return iCommodityRepository.GetCommodityByType(page,price1,price2,start,limit,out total,sort,type);
        }
    }
}
