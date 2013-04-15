using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISkuPropService
    {
        SkuProp getSkuPropbyIntID(string id);
        IList<SkuProp> GetSkuPropsBySkuID(string Sku_ID, int start, int limit, out long total);
        SkuProp Load(string id);
        void Save(SkuProp skuProp);
        void Update(SkuProp skuProp);
        void Delete(string id);
    }
}