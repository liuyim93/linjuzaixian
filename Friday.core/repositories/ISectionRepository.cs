using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface ISectionRepository : IRepository<Section>
    {
        Section SearchByName(string name);
        IList<Section> Search(List<DataFilter> termList);
        IList<Section> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
