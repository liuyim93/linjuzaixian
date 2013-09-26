using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface ISkuPropRepository : IRepository<SkuProp>
    {
        SkuProp getSkuPropbyIntID(string id);
        void deleteSkuPropbyID(string id);
        IList<SkuProp> GetAllSkuPropsBySkuID(string Sku_ID);
        IList<SkuProp> GetSkuPropsBySkuID(string SKU_ID, int start, int limit, out long total);
        IList<SkuProp> GetSkuPropsBySkuID(string Sku_ID, int start, int limit, out long total, bool isDelete);
        IList<PropID> GetProp(string cid);
        IList<SkuProp> GetSkuProOrderByID(Sku sku);
    }
}