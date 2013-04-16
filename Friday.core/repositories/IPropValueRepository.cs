using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IPropValueRepository : IRepository<PropValue>
    {
        IList<PropValue> Search(List<DataFilter> termList);
        IList<PropValue> Search(List<DataFilter> termList, int start, int limit, out long total);
        bool IsHaveTheSameName(string name);
        IList<PropValue> GetPropValueListByPropID(int pid);
    }
}
