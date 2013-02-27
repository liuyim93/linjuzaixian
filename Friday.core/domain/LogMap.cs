using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class LogMap:ClassMap<Log>
    {
        public LogMap()
        {
            Id(o => o.LogID).GeneratedBy.Native();
            Map(o => o.EventID).Nullable();
            Map(o => o.Priority).Not.Nullable();
            Map(o => o.Severity).Length(32).Not.Nullable();
            Map(o => o.Title).Length(256).Not.Nullable();
            Map(o => o.Timestamp).Not.Nullable();
            Map(o => o.MachineName).Length(32).Not.Nullable();
            Map(o => o.AppDomainName).Length(512).Not.Nullable();
            Map(o => o.ProcessID).Length(256).Not.Nullable();
            Map(o => o.ProcessName).Length(512).Not.Nullable();
            Map(o => o.ThreadName).Length(512).Nullable();
            Map(o => o.Win32ThreadId).Length(128).Nullable();
            Map(o => o.Message).Length(1500).Nullable();
            Map(o => o.FormattedMessage).Length(10000).Nullable();

            HasMany<CategoryLog>(o => o.CategoryLogs).KeyColumn("LogID").Inverse().Cascade.All();
        }
    }
}
