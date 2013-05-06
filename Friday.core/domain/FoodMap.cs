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
            //2013-05-3 wanghaichuan add Description
            Map(o => o.Description);
            //Map(o => o.MerchantGoodsType).CustomType<MerchantGoodsType>(); 

            Map(o => o.Amount).Default("0").Not.Nullable(); ;
            Map(o => o.ValuingCount).Default("0").Not.Nullable(); ;
            Map(o => o.AverageValuing).Default("0").Not.Nullable(); ;
            Map(o => o.MonthAmount).Default("0").Not.Nullable();

            //2012-02-21 pangfuxing  add MerchantGoodsType
            //References<MerchantGoodsType>(o => o.MerchantGoodsType).Not.Nullable();
            References<GlobalGoodsType>(o => o.GlobalGoodsType).Not.Nullable();
            References<Restaurant>(o => o.Restaurant).Not.Nullable();//Shop 1 :N Food
            //HasMany<MyFavorite>(o => o.Favorite).Inverse().Cascade.All();
        }
    }
}
