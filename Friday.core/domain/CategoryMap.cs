using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class CategoryMap:ClassMap<Category>
    {
        public CategoryMap()
        {
            Id(o => o.CategoryID).GeneratedBy.Native();
            Map(o => o.CategoryName).Length(64).Not.Nullable();

            HasMany<CategoryLog>(o => o.CategoryLogs).Inverse().Cascade.All();
        }
    }
}
