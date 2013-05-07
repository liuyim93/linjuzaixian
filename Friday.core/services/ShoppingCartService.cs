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
    public class ShoppingCartService:IShoppingCartService
    {
        private IShoppingCartRepository iShoppingCartRepository;
        private ILogger iLogger;
        public ShoppingCartService(IShoppingCartRepository iShoppingCartRepository, ILogger iLogger)
        {
            this.iShoppingCartRepository = iShoppingCartRepository;
            this.iLogger = iLogger;
        }
        public ShoppingCart Load(string id)
        {
            return iShoppingCartRepository.Load(id);
        }

        public void Save(ShoppingCart ShoppingCart)
        {
            iLogger.LogMessage("插入ShoppingCart数据，ID：" + ShoppingCart.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShoppingCartRepository.SaveOrUpdate(ShoppingCart);
        }

        public void Update(ShoppingCart ShoppingCart)
        {
            iLogger.LogMessage("更新ShoppingCart数据，ID：" + ShoppingCart.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShoppingCartRepository.SaveOrUpdate(ShoppingCart);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除ShoppingCart数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iShoppingCartRepository.Delete(id);
        }

        public ShoppingCart getShoppingCartBySystemUser(string SystemUserID)
        {
            return iShoppingCartRepository.getShoppingCartBySystemUser(SystemUserID);
        }
    }
}
