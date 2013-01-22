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
            Table("Food");
            Id(o => o.Id);
            Map(o => o.Name);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.MonthAmount);
            Map(o => o.Price);
            Map(o => o.Image);
            References<MerchantGoodsType>(o => o.MerchantGoodsType);
            References<Restaurant>(o => o.Restaurant);//Shop 1 :N Food
            HasMany<MyFavorite>(o => o.Favorite).Inverse().Cascade.All();
        }
    }
}
