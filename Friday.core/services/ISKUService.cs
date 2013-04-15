using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface ISKUService
    {
        IList<SKU> GetSKUsByCommodityID(string commodityID, int start, int limit, out long total);
        SKU Load(string id);
        void Save(SKU sku);
        void Update(SKU sku);
        void Delete(string id);
    }
}