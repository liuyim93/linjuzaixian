using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface ISKURepository : IRepository<SKU>
    {
        IList<SKU> GetSKUsByCommodityID(string commodityID, int start, int limit, out long total);
    }
}
