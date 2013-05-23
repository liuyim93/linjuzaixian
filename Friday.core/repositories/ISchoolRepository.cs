using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface ISchoolRepository : IRepository<School>
    {
        IList<School> GetChildrenFromParentID(string ParentID);
        bool IsHaveChild(School School);
        School SearchByShortName(string name);
        IList<School> Search(List<DataFilter> termList);
        IList<School> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
