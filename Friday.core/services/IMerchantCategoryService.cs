using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IMerchantCategoryService
    {
        MerchantCategory Load(string id);
        void Save(MerchantCategory merchantCategory);
        void Update(MerchantCategory merchantCategory);
        void Delete(string id);
        MerchantCategory SearchByMerchantCategoryName(string name);
        IList<MerchantCategory> Search(List<DataFilter> termList);
        IList<MerchantCategory> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
