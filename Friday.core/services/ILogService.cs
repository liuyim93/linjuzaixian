using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ILogService
    {
        Log Load(string id);
        IList<Log> Search(List<DataFilter> termList);
        IList<Log> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
