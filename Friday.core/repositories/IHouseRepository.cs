﻿using System;
using friday.core.domain;
using friday.core.components;
using System.Collections.Generic;
namespace friday.core.repositories
{
    public interface IHouseRepository:IRepository<House>
    {
        IList<House> GetHouseByRentIDOrderByMonthAmountDesc(string rentID);
        System.Collections.Generic.IList<House> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<House> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
        IList<House> GetHouseByRentIDAndKeywordAndBetweenPriceOrderBy(string rentID, string keyword, double price1, double price2, string goodTypeId,string orderType, int start, int limit, out int total);
        IList<House> GetHouseByRentIDAndKeywordAndBetweenPriceOrderBy(string rentID, string keyword, double price1, double price2, string orderType);
        IList<House> GetHouseByRentIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string rentID, string merchantGoodTypeID, int start, int limit, out int total);
       
      
    }
}
