using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class AddressMap : ClassMap<Address>
    {
        public AddressMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.AddressName).Not.Nullable();
            Map(o => o.Tel);
            Map(o=>o.BackupTel);
            Map(o=>o.Email);
            Map(o => o.prov);
            Map(o => o.city);
            Map(o => o.dist);
            Map(o => o.provName);
            Map(o => o.cityName);
            Map(o => o.distName);
            Map(o => o.post);
            Map(o=>o.Linkman);
            Map(o => o.StreetAddress);
            Map(o=>o.QQ);
            Map(o=>o.Weixin);
            References<SystemUser>(o => o.SystemUser).Not.Nullable();
        }
    }
}
