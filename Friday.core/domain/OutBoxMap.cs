using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;


namespace friday.core.domain
{
    public class OutBoxMap:ClassMap<OutBox>
    {
        public OutBoxMap()
        {
            
            Id(o => o.ID).GeneratedBy.Native();
            Map(o => o.Msg);
            Map(o => o.Mbno);
            Map(o => o.Comport);
            Map(o => o.Report);
            Map(o => o.SendTime);
            Map(o => o.username);
        }
    }
}
