using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class MessageMap : ClassMap<Message>
    {
        public MessageMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.IsNew);
            Map(o => o.MessageType);
            Map(o => o.ThreadIndex);
            Map(o => o.TrackIndex);
            References<LoginUser>(o => o.FromLoginUser).Not.Nullable();
            References<LoginUser>(o => o.ToLoginUser).Not.Nullable();
            References<MessageContent>(o=>o.MessageContent);
        }
    }
}
