﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class AnonymousUserMap:SubclassMap<AnonymousUser>
    {
        public AnonymousUserMap()
        {
        }

    }
}
