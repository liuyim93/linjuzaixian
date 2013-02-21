using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
namespace friday.core.repositories
{
    public class MerchantGoodsTypeRepository : Repository<MerchantGoodsType>, friday.core.repositories.IMerchantGoodsTypeRepository
    {
        //public string GetGoodsTypeNamesByMerchantID(string mid) 
        //{
        //    var q = Session.CreateQuery(@"select at  from   Activity as  at   where  at.Name=:attname ")
        //                  .SetString("spname", name).UniqueResult<Activity>(); ;

        //    return q;
        //}
        public IList<MerchantGoodsType> GetGoodsTypeByMerchantID(string mid)
        {
            //var start = (pageIndex - 1) * pageSize;
            //var end = pageSize;
            var q = Session.CreateQuery(@"select mgt from MerchantGoodsType as mgt
                     where Merchant_id=:mchid")
                      .SetString("mchid", mid);



            return q.List<MerchantGoodsType>();
        }
    }
}
