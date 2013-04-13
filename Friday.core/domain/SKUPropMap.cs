using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SKUPropMap:ClassMap<SKUProp>
    {
        public SKUPropMap()
        {
            Id(o => o.Id).GeneratedBy.Native();
            Map(o => o.IsDelete);

            References<PropID>(o => o.PropID).Not.Nullable();
            References<PropValue>(o => o.PropValue).Not.Nullable();

        }
    }
}
