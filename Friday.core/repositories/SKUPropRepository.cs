using System;
using System.Collections.Generic;
using NHibernate.Linq;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public class SKUPropRepository : Repository<SKUProp>, ISKUPropRepository
    {
        public IList<SKUProp> GetSKUPropsBySkuID(string SKU_ID, int start, int limit, out long total)
        {
            var list = (from x in this.Session.Query<SKUProp>() select x).Where(o => o.SKU.skuId ==Convert.ToInt16(SKU_ID) && o.IsDelete == false).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<SKUProp>() select x).Where(o => o.SKU.skuId == Convert.ToInt16(SKU_ID) && o.IsDelete == false).Count();
            return list;
        }
    }
}
