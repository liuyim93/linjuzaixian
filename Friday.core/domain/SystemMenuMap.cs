﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SystemMenuMap : ClassMap<SystemMenu>
    {

        public SystemMenuMap()
        {
            Table("SystemMenu");
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");
            Map(o => o.Version);
            Map(o => o.MenuRoute);
            Map(o => o.MenuImage);
            Map(o => o.ParentID);
            Map(o => o.TLevel);
            Map(o => o.TreeCode);
            Map(o => o.Name).Column("MenuName");
            Map(o => o.Leaf);
            Map(o => o.Remarks);
            Map(o => o.MenuRel);
            Map(o => o.ColIndex);
            Map(o => o.IfiFrame);
            
            HasMany<SystemButton>(o => o.Buttons).AsSet().KeyColumn("MenuID").Cascade.SaveUpdate().LazyLoad().ForeignKeyConstraintName("Menu_Button_FK");
            HasMany<RoleInMenu>(b => b.RoleInMenus).KeyColumn("MenuID").Cascade.All().Inverse().LazyLoad().ForeignKeyConstraintName("Menu_RoleInMenu_FK");
            References<SystemUrl>(b => b.SystemUrl).LazyLoad().Column("UrlID");
        }
    }
}