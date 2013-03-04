using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IMerchantService
    {
        Merchant Load(string id);
        void Save(Merchant merchant);
        void Update(Merchant merchant);
        void Delete(string id);     
        
        IList<Merchant> Search(List<DataFilter> termList);
        IList<Merchant> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
