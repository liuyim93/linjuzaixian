using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISkuPropService
    {
        IList<SkuProp> GetAllSkuPropsBySkuID(string Sku_ID);
        SkuProp getSkuPropbyIntID(string id);
        void deleteSkuPropbyID(string id);
        IList<SkuProp> GetSkuPropsBySkuID(string Sku_ID, int start, int limit, out long total);
        SkuProp Load(string id);
        void Save(SkuProp skuProp);
        void Update(SkuProp skuProp);
        void Delete(string id);
    }
}