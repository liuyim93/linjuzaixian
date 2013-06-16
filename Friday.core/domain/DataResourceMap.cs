using System;
using System.Linq;
using System.Text;
using friday.core.domain;
using Iesi.Collections.Generic;
using friday.core.EnumType;
using System.Collections.Generic;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class DataResourceMap:ClassMap<DataResource>
    {
        public DataResourceMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.CheckState).CustomType<CheckState>();
            Map(o => o.Title);
            Map(o => o.Description);
            Map(o => o.Publisher);
            Map(o => o.Source);
            Map(o => o.TotalViews);
            Map(o => o.isHelp);

            HasMany<DataAttachment>(o => o.DataAttachments).Cascade.All().Inverse();
            References<Section>(o => o.Section).Not.Nullable(); 
            References<LoginUser>(o => o.LoginUser).Not.Nullable();
       
        }
    }
}
