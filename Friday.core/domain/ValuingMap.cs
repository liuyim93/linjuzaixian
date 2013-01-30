﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class ValuingMap : ClassMap<Valuing>
    {
        public ValuingMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.AverageScore);
            Map(o => o.EntityIndex);
            Map(o => o.IsShownAnonymous);
            Map(o => o.ValuingContent);
            References<LoginUser>(o => o.FromLoginUser).Not.Nullable();
            References<LoginUser>(o => o.ToLoginUser).Not.Nullable();
            //HasMany<ValuingItem>(o=>o.ValuingItems).Inverse().Cascade.All();
        }
    }
}