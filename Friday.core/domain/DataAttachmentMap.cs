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
    public class DataAttachmentMap : ClassMap<DataAttachment>
    {
        public DataAttachmentMap()
        {
      
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);

            Map(o => o.AttachmentName);
            Map(o => o.AttachmentUrl);
            Map(o => o.Description);
          
            
        }
    }
}
