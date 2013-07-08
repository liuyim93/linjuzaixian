using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IDataResourceRepository : IRepository<DataResource>
    {
        DataResource SearchByName(string name);
        IList<DataResource> Search(List<DataFilter> termList);
        IList<DataResource> Search(List<DataFilter> termList, int start, int limit, out long total);
        DataResource SearchBySectionName(string sectionName);
        DataResource SearchBySectionCode(string sectionCode);
    }
}
