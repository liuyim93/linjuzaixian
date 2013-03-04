using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IRentService
    {
        Rent Load(string id);
        void Save(Rent rent);
        void Update(Rent rent);
        void Delete(string id);
        Rent SearchByShortName(string name);
        IList<Rent> Search(List<DataFilter> termList);
        IList<Rent> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
