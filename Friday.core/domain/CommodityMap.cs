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
            Map(o => o.Image1);
            Map(o => o.Image2);
            Map(o => o.Image3);
            Map(o => o.DiscountPrice);
            Map(o => o.DiscountInventoryCount);
            Map(o => o.IsDiscount);
            Map(o => o.IsLimited);
            //2013-05-3 wanghaichuan add Description
            Map(o => o.Description).Length(99999999);
            //Map(o => o.MerchantGoodsType).CustomType<MerchantGoodsType>();

            Map(o => o.Amount).Default("0").Not.Nullable(); ;
            Map(o => o.ValuingCount).Default("0").Not.Nullable(); ;
            Map(o => o.AverageValuing).Default("0").Not.Nullable(); ;
            Map(o => o.MonthAmount).Default("0").Not.Nullable();

            //References<MerchantGoodsType>(o => o.MerchantGoodsType).Not.Nullable();
            References<GlobalGoodsType>(o => o.GlobalGoodsType).Not.Nullable();
            //2013-05-09 basilwang 增加GlobalGoodsTypeFamily
            Map(o => o.GlobalGoodsTypeFamily).Default("").Not.Nullable();
            HasMany<Sku>(o => o.Skus).Inverse().Cascade.All();

            References<Shop>(o => o.Shop).Not.Nullable(); 
           
        }
    }
}
