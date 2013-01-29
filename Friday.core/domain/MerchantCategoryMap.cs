using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.EnumType;

namespace friday.core.domain
{
    public class MerchantCategoryMap : ClassMap<MerchantCategory>
    {
        public MerchantCategoryMap()
        {
          
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.MerchantCategoryName);
            Map(o => o.MerchantType).CustomType<MerchantTypeEnum>();

        }
    }
}
