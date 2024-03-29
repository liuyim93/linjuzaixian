﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class FeedBackMap:ClassMap<FeedBack>
    {
        public FeedBackMap()
        {
         
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o=>o.EntityIndex);
            Map(o=>o.Contents);
            Map(o => o.Type);
            References<LoginUser>(o => o.LoginUser).Not.Nullable(); //Shop 1 :N Food
            References<FeedBack>(o => o.ParentFeedBack);
            HasMany<FeedBack>(o => o.ChildFeedBacks).Inverse().Cascade.All();

        }
    }
}
