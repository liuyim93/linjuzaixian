using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IMerchantRepository : IRepository<Merchant>
    {
       IList<Merchant> Search(List<DataFilter> termList);
       IList<Merchant> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
