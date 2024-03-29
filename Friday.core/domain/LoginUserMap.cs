﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.EnumType;

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
       
            Map(o => o.LoginName);
            Map(o => o.Password);
            Map(o => o.IsAdmin);
            //Map(o => o.UserType).CustomType<UserTypeEnum>();

            HasMany<LoginUserOfMerchant>(o => o.LoginUserOfMerchants).Inverse().Cascade.All();
            //增加LoginUser到UserInRole的一对多关联
            HasMany<UserInRole>(o => o.UserInRoles).Inverse().Cascade.All();
            //References<Merchant>(o => o.Merchant);//Shop 1 :N Food
            HasMany<DataResource>(o => o.DataResources).Inverse().Cascade.All();

            //2013-02-10 basilwang we can't use unique, cause this column may be null,  will be multiple null
            References<SystemUser>(o => o.SystemUser).Column("SystemUserID").Nullable().Cascade.All(); //.Unique()对“SystemUserID”进行了唯一性限定 
        }
    }
}
