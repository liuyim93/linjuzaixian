﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISkuService
    {
        Sku getSkubyIntID(string id);
        void deleteSkubyID(string id);
        IList<Sku> GetSkusByCommodityID(string commodityID, int start, int limit, out long total);
        IList<Sku> GetSkusByCommodityID(string commodityID);
        Sku GetMinPriceSkusByCommodityID(string commodityID);
        Sku Load(string id);
        void Save(Sku sku);
        void Update(Sku sku);
        void Delete(string id);
        IList<Sku> GetSkusByCommodityOrderByID(Commodity commodity);
        string GetProString(Sku sku);
    }
}