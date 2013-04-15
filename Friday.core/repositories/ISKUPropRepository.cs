using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface ISkuPropRepository : IRepository<SkuProp>
    {
        IList<SkuProp> GetSkuPropsBySkuID(string SKU_ID, int start, int limit, out long total);
    }
}