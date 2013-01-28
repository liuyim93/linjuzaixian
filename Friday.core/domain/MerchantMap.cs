using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class MerchantMap : ClassMap<Merchant>
    {
        public MerchantMap()
        {
          
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            /*   ************************* */

            /* test not keynullable*/
            HasMany<LoginUserOfMerchant>(o => o.LoginUserOfMerchants);
            HasMany<MerchantGoodsType>(o => o.MerchantGoodsTypes).Inverse().Cascade.All();

        }
    }
}
