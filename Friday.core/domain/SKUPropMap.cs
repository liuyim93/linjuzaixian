using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SkuPropMap:ClassMap<SkuProp>
    {
        public SkuPropMap()
        {
            Id(o => o.Id).GeneratedBy.Native();
            Map(o => o.IsDelete);
            Map(o => o.CreateTime);

            References<PropID>(o => o.PropID).Not.Nullable();
            References<PropValue>(o => o.PropValue).Not.Nullable();
            References<Sku>(o => o.SKU).Not.Nullable();
        }
    }
}
