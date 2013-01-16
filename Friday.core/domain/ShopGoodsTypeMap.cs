using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class ShopGoodsTypeMap:ClassMap<ShopGoodsType>
    {
        public ShopGoodsTypeMap()
        {
            Table("ShopFoodType");
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o=>o.GoodsType);
            References<Shop>(o => o.Shop);//Shop 1 :N Food

        }
    }
}
