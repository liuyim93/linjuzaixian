﻿using System;
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
            var list = (from x in this.Session.Query<Sku>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).OrderByDescending(o=>o.CreateTime).Skip(start).Take(limit).ToList();
            total = (from x in this.Session.Query<Sku>() select x).Where(o => o.Commodity.Id == commodityID && o.IsDelete == false).Count();
            return list;
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
