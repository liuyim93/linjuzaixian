using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISkuService
    {
        IList<Sku> GetSkusByCommodityID(string commodityID, int start, int limit, out long total);
        Sku Load(string id);
        void Save(Sku sku);
        void Update(Sku sku);
        void Delete(string id);
    }
}