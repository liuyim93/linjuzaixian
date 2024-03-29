﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public class FoodService:IFoodService
    {
        private IFoodRepository iFoodRepository;
        private ILogger iLogger;
        public FoodService(IFoodRepository iFoodRepository, ILogger iLogger)
        {
            this.iFoodRepository = iFoodRepository;
            this.iLogger = iLogger;
        }

        public IList<Food> GetFoodByRestaurantIDOrderByMonthAmountDesc(string restaurantID)
        {
            return iFoodRepository.GetFoodByRestaurantIDOrderByMonthAmountDesc(restaurantID);
        }

        public Food Load(string id)
        {
            return iFoodRepository.Load(id);
        }

        public void Save(Food food)
        {
            iLogger.LogMessage("插入Food数据，ID：" + food.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFoodRepository.SaveOrUpdate(food);
        }

        public void Update(Food food)
        {
            iLogger.LogMessage("更新Food数据，ID：" + food.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFoodRepository.SaveOrUpdate(food);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除Food数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iFoodRepository.Delete(id);
        }

        public IList<Food> Search(List<DataFilter> termList)
        {
            return iFoodRepository.Search(termList);
        }

        public IList<Food> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iFoodRepository.Search(termList, start, limit, out total);
        }
        public IList<Food> GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(string restaurantID, string keyword, double price1, double price2, string orderType)
        {
            return iFoodRepository.GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(restaurantID, keyword, price1, price2, orderType);
        }
        public IList<Food> GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(string restaurantID, string keyword, double price1, double price2,string goodTypeId, string orderType, int start, int limit, out int total)
        {
            return iFoodRepository.GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(restaurantID, keyword, price1, price2,goodTypeId, orderType, start, limit, out total);
        }
        public IList<Food> GetFoodByRestaurantIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string restaurantID, string merchantGoodTypeID, int start, int limit, out int total)
        {
            return iFoodRepository.GetFoodByRestaurantIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(restaurantID, merchantGoodTypeID, start, limit, out total);
        }
    }
}
