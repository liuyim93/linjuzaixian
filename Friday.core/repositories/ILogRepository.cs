using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface ILogRepository : IRepository<Log>
    {
         Log GerLogByLogID(string id);
       
         IList<Log> Search(List<DataFilter> termList);
         IList<Log> Search(List<DataFilter> termList, int start, int limit, out long total);

    }
}
