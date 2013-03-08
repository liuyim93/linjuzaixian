using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.EnumType;

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
            Map(o => o.Email);
            Map(o => o.Description);
            Map(o => o.Name);
            Map(o => o.ShortName);
            Map(o => o.Owener);
            Map(o => o.Logo);
            Map(o => o.sBrand);
            Map(o => o.bBrand);
            Map(o => o.Bulletins);
            Map(o => o.Address);
            Map(o => o.Tel);
            Map(o => o.ShopHours);
            Map(o => o.Activity);
            Map(o => o.Distance);
            Map(o => o.Rate);
            Map(o => o.ShopStatus).CustomType<ShopStatusEnum>();
            Map(o => o.MerchantType).CustomType<MerchantTypeEnum>();

            References<MerchantCategory>(o => o.MerchantCategory);
            /* test not keynullable*/
            HasMany<LoginUserOfMerchant>(o => o.LoginUserOfMerchants).Inverse().Cascade.All();
            HasMany<MerchantGoodsType>(o => o.MerchantGoodsTypes).Inverse().Cascade.All();
            HasMany<SchoolOfMerchant>(o => o.SchoolOfMerchants).Inverse().Cascade.All();

        }
    }
}
