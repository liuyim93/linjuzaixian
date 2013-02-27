using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class CategoryLogMap:ClassMap<CategoryLog>
    {
        public CategoryLogMap()
        {
            Id(o => o.CategoryLogID).GeneratedBy.Native();
            References<Category>(o => o.Category).Column("CategoryID").Not.Nullable();
            References<Log>(o => o.Log).Column("LogID").Not.Nullable();
            //References<Category>(o => o.Category).Not.Nullable();
            //References<Log>(o => o.Log).Fetch.Join().Not.Nullable();
        }
    }
}
