using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class LoginUserMap : ClassMap<LoginUser>
    {
        public LoginUserMap()
        {
          
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            References<SystemUser>(o => o.SystemUser); 
            HasMany<LoginUserOfMerchant>(o => o.LoginUserOfMerchants).Inverse().Cascade.All();
            //References<Merchant>(o => o.Merchant);//Shop 1 :N Food
            
        }
    }
}
