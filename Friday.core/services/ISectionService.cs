using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISectionService
    {
        Section Load(string id);
        void Save(Section activity);
        void Update(Section activity);
        void Delete(string id);
        Section SearchByName(string name); 
        IList<Section> Search(List<DataFilter> termList);
        IList<Section> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<Section> GetAll();
    }
}
