using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SystemButtonMap : ClassMap<SystemButton>
    {

        public SystemButtonMap()
        {
            Table("SystemButton");
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");
            Map(o => o.Version);
            Map(o => o.ColIndex);
            Map(o => o.ButtonShowName);
            Map(o => o.ButtonName);
            Map(o => o.CloseType);

            References<SystemMenu>(b => b.Menu).LazyLoad().Column("MenuID");
            References<SystemUrl>(b => b.SystemUrl).LazyLoad().Column("UrlID");
 
           
        }
    }
}
