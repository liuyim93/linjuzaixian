using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SkuMap:ClassMap<Sku>
    {
        public SkuMap()
        {
            Id(o => o.skuId).GeneratedBy.Native();
            Map(o => o.IsDelete);
            Map(o => o.price).Default("0").Not.Nullable(); ;
            Map(o => o.priceCent).Default("0").Not.Nullable(); ;
            Map(o => o.stock).Default("0").Not.Nullable(); ;

            References<Commodity>(o => o.Commodity).Not.Nullable();
            HasMany<SkuProp>(o => o.SKUProps).Inverse().Cascade.All();
        }
    }
}
