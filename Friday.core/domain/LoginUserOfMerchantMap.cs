﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class LoginUserOfMerchantMap : ClassMap<LoginUserOfMerchant>
    {
        public LoginUserOfMerchantMap()
        {
          
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            References<LoginUser>(o => o.LoginUser).Not.Nullable();
            References<Merchant>(o => o.Merchant).Fetch.Join().Not.Nullable() ;

        }
    }
}
