using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class FoodMap : ClassMap<Food>
    {
        public FoodMap()
        {

            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.Name);  
            Map(o => o.Price);
            Map(o => o.OldPrice);
            Map(o => o.InventoryCount);
            Map(o => o.IsEnabled);
            Map(o => o.Image);
            Map(o => o.DiscountPrice);
            Map(o => o.DiscountInventoryCount);
            Map(o => o.IsDiscount);
            Map(o => o.IsLimited);
            //Map(o => o.MerchantGoodsType).CustomType<MerchantGoodsType>(); 

            Map(o => o.Amount);
            Map(o => o.ValuingCount);
            Map(o => o.AverageValuing);
             

            //References<MerchantGoodsType>(o => o.MerchantGoodsType);
            References<Restaurant>(o => o.Restaurant).Not.Nullable();//Shop 1 :N Food
            //HasMany<MyFavorite>(o => o.Favorite).Inverse().Cascade.All();
        }
    }
}
