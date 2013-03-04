using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISchoolService
    {
        School Load(string id);
        void Save(School school);
        void Update(School school);
        void Delete(string id);
        School SearchByShortName(string name);
        IList<School> Search(List<DataFilter> termList);
        IList<School> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
