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
       
            HasMany<LoginUserOfMerchant>(o => o.LoginUserOfMerchants).Inverse().Cascade.All();
            //References<Merchant>(o => o.Merchant);//Shop 1 :N Food

            //2013-02-10 basilwang we can't use unique, cause this column may be null,  will be multiple null
            References<SystemUser>(o => o.SystemUser).Column("SystemUserID").Nullable().Cascade.All(); //.Unique()对“SystemUserID”进行了唯一性限定 
        }
    }
}
