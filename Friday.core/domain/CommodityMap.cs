using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class CommodityMap : ClassMap<Commodity>
    {
        public CommodityMap()
        {
           
            Id(o => o.Id);
            Map(o => o.Name);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Image);
            Map(o => o.Price);
            Map(o => o.OldPrice);
            Map(o => o.InventoryCount);
            Map(o => o.IsEnabled);
            
          
            References<Shop>(o => o.Shop); 
           
        }
    }
}
