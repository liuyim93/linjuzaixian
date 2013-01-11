using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class ShopMap : ClassMap<Shop>
    {
        public ShopMap()
        {
            Table("Shop");
            Id(o => o.Id);
            Map(o => o.Name);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Address);
            Map(o => o.Description);
            Map(o => o.Bulletins);
            Map(o => o.Distance);
            Map(o => o.ShopType);
            Map(o => o.Logo);
            Map(o => o.SendTime);
            //2013-01-07 basilwang add index for search speed  
            //we can't set unique now, cause there are already data here
            Map(o => o.ShortName).Index("ShopShortName");
            Map(o => o.SendPrice);
            Map(o => o.Rate);
            Map(o=>o.NightStartHour);
            Map(o=>o.NightEndHour);
            Map(o => o.Owener);
            Map(o=>o.MorningBeginHour);
            Map(o => o.MorningEndHour);
            Map(o => o.AfternoonBeginHour);
            Map(o => o.AfternoonEndHour);
            Map(o => o.Activity);
            Map(o => o.ShopHours);
            Map(o=>o.Tel);
            Map(o=>o.Cost);
            Map(o => o.ShopStatus);
            HasMany<Food>(o => o.Foods).Inverse().LazyLoad().Cascade.All();
            HasMany<ShopFoodType>(o => o.ShopFoodTypes).Inverse().LazyLoad().Cascade.All();
            HasMany<SchoolShop>(o =>o.Schools).Inverse().LazyLoad().Cascade.All();
            HasMany<MyOrder>(o => o.MyOrders).Inverse().LazyLoad().Cascade.All();

        }
    }
}
