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

            Map(o => o.Direction);
            Map(o => o.TrackIndex);
            Map(o => o.Comments);

            References<Valuing>(o => o.Valuing).Not.Nullable();

        }
    }
}
