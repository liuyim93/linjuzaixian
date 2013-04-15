using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class PropIDMap:ClassMap<PropID>
    {
        public PropIDMap()
        {
            Id(o => o.Id).GeneratedBy.Native();//. Default(1000000);
            Map(o => o.IsDelete);
            Map(o => o.PropIDName);
            References<Merchant>(o => o.Merchant).Not.Nullable();
        }
    }
}
