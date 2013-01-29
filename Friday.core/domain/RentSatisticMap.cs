using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class RentSatisticMap : ClassMap<RentSatistic>
    {
        public RentSatisticMap()
        {

            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.Year);
            Map(o => o.Month);
            Map(o => o.Day);
            Map(o => o.Amount);
            Map(o => o.ValuingCount);
            Map(o => o.AverageValuing);
             

            Map(o => o.Amount);
            Map(o => o.ValuingCount);
            Map(o => o.AverageValuing);



            References<Rent>(o => o.Rent).Not.Nullable(); 
        }
    }
}
