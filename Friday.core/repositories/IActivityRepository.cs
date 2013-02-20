using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IActivityRepository : IRepository<Activity>
    {
        Activity SearchByShortName(string name);
        IList<Activity> Search(List<DataFilter> termList);
        IList<Activity> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
