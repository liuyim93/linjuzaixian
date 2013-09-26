using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface ISkuRepository : IRepository<Sku>
    {
        Sku getSkubyIntID(string id);
        void deleteSkubyID(string id);
        IList<Sku> GetSkusByCommodityID(string commodityID, int start, int limit, out long total);
        IList<Sku> GetSkusByCommodityID(string commodityID);
        Sku GetMinPriceSkusByCommodityID(string commodityID);
        IList<Sku> GetSkusByCommodityOrderByID(Commodity commodity);
       // IList<SkuProp> getSkuProOrderByID(Sku sku);

    }
}
