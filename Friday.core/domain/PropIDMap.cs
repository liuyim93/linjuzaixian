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
            //Id(o => o.Id);
            //Map(o => o.CreateTime);
            //Map(o => o.IsDelete);
            //Map(o => o.Version);
            //Map(o => o.IndexId).Generatedby.Native();//. Default(1000000);
            Id(o=>o.Id).GeneratedBy.Native();
            Map(o => o.IsDelete);
            Map(o => o.PropIDName);
            Map(o => o.CreateTime);
            References<Merchant>(o => o.Merchant).Not.Nullable();
        }
    }
}
