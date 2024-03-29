﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class FoodStatisticMap : ClassMap<FoodStatistic>
    {
        public FoodStatisticMap()
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
             

            //References<MerchantGoodsType>(o => o.MerchantGoodsType);
            References<Food>(o => o.Food).Not.Nullable();//Shop 1 :N Food
            //HasMany<MyFavorite>(o => o.Favorite).Inverse().Cascade.All();
        }
    }
}
