using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class ValuingCommentsMap : ClassMap<ValuingComments>
    {
        public ValuingCommentsMap()
        {
          
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.Direction).Not.Nullable();
            Map(o => o.TrackIndex).Not.Nullable();
            Map(o => o.Comments).Not.Nullable();

            References<Valuing>(o => o.Valuing).Not.Nullable();

        }
    }
}
