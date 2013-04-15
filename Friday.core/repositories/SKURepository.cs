using System;
using System.Collections.Generic;
using NHibernate.Linq;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public class SkuRepository : Repository<Sku>, ISkuRepository
    {
        public IList<Sku> GetSkusByCommodityID(string commodityID, int start, int limit, out long total)
        {
            var list = (from x in this.Session.Query<Sku>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<Sku>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).Count();
            return list;
        }
    }
}
