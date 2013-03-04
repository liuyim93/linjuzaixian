using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface ILoginUserOfMerchantService
    {
        LoginUserOfMerchant Load(string id);
        void Save(LoginUserOfMerchant restaurant);
        void Update(LoginUserOfMerchant restaurant);
        void Delete(string id);
        LoginUserOfMerchant SearchByShortName(string name);
        IList<LoginUserOfMerchant> Search(List<DataFilter> termList);
        IList<LoginUserOfMerchant> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
