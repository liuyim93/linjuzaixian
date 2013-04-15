using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface ISKUPropRepository : IRepository<SKUProp>
    {
        IList<SKUProp> GetSKUPropsBySkuID(string SKU_ID, int start, int limit, out long total);
    }
}
