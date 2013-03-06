using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class ValuingMap : ClassMap<Valuing>
    {
        public ValuingMap()
        {
          
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.AverageScore);
            Map(o => o.ValuingContent);

            /* test not keynullable*/
            HasMany<ValuingComments>(o => o.ValuingComments).Inverse().Cascade.All();
            References<Merchant>(o => o.Merchant).Not.Nullable();
            References<LoginUser>(o => o.LoginUser).Not.Nullable();

        }
    }
}
