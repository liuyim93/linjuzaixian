using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface ISystemRoleRepository : IRepository<SystemRole>
    {
        IList<SystemRole> Search(List<DataFilter> termList);
        IList<SystemRole> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
