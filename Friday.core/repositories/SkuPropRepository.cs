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
        public IList<SkuProp> GetSkuPropsBySkuID(string Sku_ID, int start, int limit, out long total,bool isDelete)
        {
            var list = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.SKU.skuId == Convert.ToInt16(Sku_ID) && o.IsDelete == isDelete).OrderByDescending(o => o.CreateTime).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.SKU.skuId == Convert.ToInt16(Sku_ID) && o.IsDelete == isDelete).Count();
            return list;
        }
        public IList<SkuProp> GetSkuPropsBySkuID(string Sku_ID, int start, int limit, out long total)
        {
            var list = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.SKU.skuId == Convert.ToInt16(Sku_ID)).OrderByDescending(o => o.CreateTime).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.SKU.skuId == Convert.ToInt16(Sku_ID)).Count();
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

        public IList<SkuProp> GetSkuProOrderByID(Sku sku)
        {
            var query = (from x in this.Session.Query<SkuProp>() select x).Where(o => o.SKU == sku && o.IsDelete == false)
                
                .OrderBy(o=>o.PropID);

            return query.ToList<SkuProp>();
        }

        public void deleteSkuPropbyID(string id)
        {
            int uid = Int32.Parse(id);
            using (ITransaction tran = Session.BeginTransaction())
            {
                try
                {
                    Session.CreateQuery(@"delete SkuProp  where  Id=:sId ")
                         .SetInt32("sId", uid).ExecuteUpdate();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
        }

        public IList<PropID> GetProp(string cid)
        {

            var list = (from x in this.Session.Query<SkuProp>() 
                        where x.SKU.Commodity.Id==cid
                        &&x.IsDelete==false
                        &&x.SKU.IsDelete==false
                     
                        select x.PropID)
                .Where(
                o => o.IsDelete == false
                
                ).Distinct()
                .ToList();
            return list;
        }
    }
}
