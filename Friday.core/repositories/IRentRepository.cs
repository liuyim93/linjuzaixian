﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IRentRepository : IRepository<Rent>
    {
        Rent SearchByShortName(string name);
        IList<Rent> Search(List<DataFilter> termList);
        IList<Rent> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
