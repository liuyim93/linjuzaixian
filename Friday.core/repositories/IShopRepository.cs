using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;
using friday.core.EnumType;

namespace friday.core.repositories
{
    public interface IShopRepository : IRepository<Shop>
    {
        IList<Shop> GetShopsBySchoolID(string SchoolID);
        Shop SearchByShortName(string name);
        IList<Shop> Search(List<DataFilter> termList);
        IList<Shop> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<Shop> GetShopsByMerchantType(MerchantTypeEnum mTP);
    }
}
