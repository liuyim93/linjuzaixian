using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IPropIDRepository : IRepository<PropID>
    {

        IList<PropID> Search(List<DataFilter> termList);
        IList<PropID> Search(List<DataFilter> termList, int start, int limit, out long total);
        bool IsHaveTheSameName(string name);
        PropID getPropIDbyIntID(string id);
        IList<PropID> GetPropIDByMerchantID(string mid);
    }
}
