using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;


namespace friday.core.domain
{
    public class SystemUrlMap : ClassMap<SystemUrl>
    {

        public SystemUrlMap()
        {
            Table("SystemUrl");
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");                  
            Map(o => o.UrlName);
            Map(o => o.UrlPath);
            Map(o => o.Version);
            Map(o => o.UrlRel);

            HasMany<SystemButton>(o => o.SystemButtons).Cascade.SaveUpdate().LazyLoad().ForeignKeyConstraintName("Url_Button_FK").KeyColumn("UrlID");
            HasMany<SystemMenu>(o => o.SystemMenus).Cascade.SaveUpdate().LazyLoad().ForeignKeyConstraintName("Url_Menu_FK").KeyColumn("UrlID");
   
        }
    }
}
