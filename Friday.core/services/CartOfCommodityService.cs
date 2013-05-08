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
    public class CartOfCommodityService:ICartOfCommodityService
    {
        private ICartOfCommodityRepository iCartOfCommodityRepository;
        private ILogger iLogger;
        public CartOfCommodityService(ICartOfCommodityRepository iCartOfCommodityRepository, ILogger iLogger)
        {
            this.iCartOfCommodityRepository = iCartOfCommodityRepository;
            this.iLogger = iLogger;
        }
        public CartOfCommodity Load(string id)
        {
            return iCartOfCommodityRepository.Load(id);
        }

        public void Save(CartOfCommodity CartOfCommodity)
        {
            iLogger.LogMessage("插入CartOfCommodity数据，ID：" + CartOfCommodity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCartOfCommodityRepository.SaveOrUpdate(CartOfCommodity);
        }

        public void Update(CartOfCommodity CartOfCommodity)
        {
            iLogger.LogMessage("更新CartOfCommodity数据，ID：" + CartOfCommodity.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCartOfCommodityRepository.SaveOrUpdate(CartOfCommodity);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除CartOfCommodity数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iCartOfCommodityRepository.Delete(id);
        }

        public List<CartOfCommodity> getCommoditiesByShoppingCart(string ShoppingCartID)
        {
            return iCartOfCommodityRepository.getCommoditiesByShoppingCart(ShoppingCartID);
        }

        public CartOfCommodity getCommodityBySystemUserIDAndCommodityID(string SystemUserID, string CommodityID)
        {
            return iCartOfCommodityRepository.getCommodityBySystemUserIDAndCommodityID(SystemUserID, CommodityID);
        }
    }
}
