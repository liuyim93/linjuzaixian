using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IMerchantCategoryRepository : IRepository<MerchantCategory>
    {
       MerchantCategory SearchByMerchantCategoryName(string name);
       IList<MerchantCategory> Search(List<DataFilter> termList);
       IList<MerchantCategory> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
