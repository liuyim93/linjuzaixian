﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class PropValueMap:ClassMap<PropValue>
    {
        public PropValueMap()
        {
            Id(o => o.Id).GeneratedBy.Native();
            Map(o => o.IsDelete);
            Map(o => o.PropValueName);

            References<PropID>(o => o.PropID).Not.Nullable(); 
        }
    }
}
