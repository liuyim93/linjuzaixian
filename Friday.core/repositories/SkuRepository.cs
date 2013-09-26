using System;
using System.Collections.Generic;
using NHibernate.Linq;
using System.Linq;
using System.Text;
using friday.core.domain;
using NHibernate;

namespace friday.core.repositories
{
    public class SkuRepository : Repository<Sku>, ISkuRepository
    {
        public IList<Sku> GetSkusByCommodityID(string commodityID, int start, int limit, out long total)
        {
            var list = (from x in this.Session.Query<Sku>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).OrderByDescending(o => o.CreateTime).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<Sku>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).Count();
            return list;
        }

        public IList<Sku> GetSkusByCommodityID(string commodityID)
        {
            var list = (from x in this.Session.Query<Sku>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).ToList();
            return list;
        }

        public IList<Sku> GetSkusByCommodityOrderByID(Commodity commodity)
        {
            var query = (from x in this.Session.Query<Sku>()
                         where x.Commodity == commodity
                         && x.IsDelete == false
                        
                         select x).OrderBy(o=>o.skuId);
            return query.ToList<Sku>();

        }
        public Sku GetMinPriceSkusByCommodityID(string commodityID)
        {
            var list = (from x in this.Session.Query<Sku>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false&&o.price!=0).ToList();
            Sku skp = new Sku()
            {
                price = 0,
            };//=list[0];
            for (int i = 0; i < list.Count; i++)
            {
                if (i == 0)
                {
                    skp = list[0];
                }
                if (list[i].price < skp.price)
                {
                    skp = list[i];
                }

            }
            return skp;

        }

        public Double GetMinPriceByCommodityID(string commodityID)
        {
            return GetMinPriceSkusByCommodityID(commodityID).price;
        }
        public Sku getSkubyIntID(string id)
        {
            int pid = Convert.ToInt32(id);
            var ppd = (from x in this.Session.Query<Sku>() select x).Where(o => o.skuId == pid && o.IsDelete == false).SingleOrDefault();
            return ppd;
        }

        public void deleteSkubyID(string id)
        {
            using (ITransaction tran = Session.BeginTransaction())
            {
                try
                {
                    Session.CreateQuery(@"update Sku set IsDelete=true  where  skuId=:sId ")
                         .SetString("sId", id).ExecuteUpdate();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
        }

    }
}
