using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IDataResourceService
    {
        DataResource Load(string id);
        void Save(DataResource activity);
        void Update(DataResource activity);
        void Delete(string id);
        DataResource SearchByName(string name); 
        IList<DataResource> Search(List<DataFilter> termList);
        IList<DataResource> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<DataResource> GetAll();
        DataResource SearchBySectionName(string sectionName);
        DataResource SearchBySectionCode(string sectionCode);
    }
}
