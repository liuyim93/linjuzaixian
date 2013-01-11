using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class MyFavoriteMap:ClassMap<MyFavorite>
    {
        public MyFavoriteMap()
        {
            Table("MyFavorite");
            Id(o=>o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);;
            References<SystemUser>(o => o.SystemUser);
            References<SchoolShop>(o => o.SchoolShop);
        }
    }
}
