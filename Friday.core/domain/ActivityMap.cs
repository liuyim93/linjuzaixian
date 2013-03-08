using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class ActivityMap:ClassMap<Activity>
    {
        public ActivityMap()
        {
           
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o=>o.Name);
            Map(o=>o.Matters);
            Map(o=>o.Image);
            Map(o => o.SubImage).Default("");
            Map(o=>o.Description);
        }
    }
}
