﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IPropValueService
    {
        PropValue Load(string id);

        IList<PropValue> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
