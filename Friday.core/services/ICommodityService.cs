﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ICommodityService
    {
        IList<Commodity> GetCommodityByShopIDOrderByMonthAmountDesc(string shopID);
        Commodity Load(string id);
        void Save(Commodity commodity);
        void Update(Commodity commodity);
        void Delete(string id);
        IList<Commodity> Search(List<DataFilter> termList);
        IList<Commodity> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType);
        IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType, int start, int limit, out int total);
      
    }
}
