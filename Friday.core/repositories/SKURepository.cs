using System;
using System.Collections.Generic;
using NHibernate.Linq;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public class SKURepository : Repository<SKU>, ISKURepository
    {
        public IList<SKU> GetSKUsByCommodityID(string commodityID, int start, int limit, out long total)
        {
            var list = (from x in this.Session.Query<SKU>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<SKU>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).Count();
            return list;
        }
    }
}
