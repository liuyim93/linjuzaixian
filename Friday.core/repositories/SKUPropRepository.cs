using System;
using System.Collections.Generic;
using NHibernate.Linq;
using System.Linq;
using System.Text;
using friday.core.domain;
using NHibernate;

namespace friday.core.repositories
{
    public class SkuPropRepository : Repository<SkuProp>, ISkuPropRepository
    {
        public IList<SkuProp> GetSkuPropsBySkuID(string Sku_ID, int start, int limit, out long total)
        {
            var list = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.SKU.skuId == Convert.ToInt16(Sku_ID) && o.IsDelete == false).OrderByDescending(o => o.CreateTime).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.SKU.skuId == Convert.ToInt16(Sku_ID) && o.IsDelete == false).Count();
            return list;
        }

        public IList<SkuProp> GetAllSkuPropsBySkuID(string Sku_ID)
        {
            var list = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.SKU.skuId == Convert.ToInt16(Sku_ID) && o.IsDelete == false).OrderByDescending(o => o.CreateTime).ToList();
            return list;
        }

        public SkuProp getSkuPropbyIntID(string id)
        {
            int pid = Convert.ToInt32(id);
            var ppd = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.Id == pid && o.IsDelete == false).SingleOrDefault();
            return ppd;
        }

        public void deleteSkuPropbyID(string id)
        {
            using (ITransaction tran = Session.BeginTransaction())
            {
                try
                {
                    Session.CreateQuery(@"update SkuProp set IsDelete=true  where  Id=:sId ")
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
