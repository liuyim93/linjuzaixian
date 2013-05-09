using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.services
{
    public interface IShopService
    {
        Shop Load(string id);
        void Save(Shop shop);
        void Update(Shop shop);
        void Delete(string id);
        Shop SearchByShortName(string name);
        IList<Shop> Search(List<DataFilter> termList);
        IList<Shop> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<Shop> GetAll();
        IList<Shop> GetShopsByMerchantType(MerchantTypeEnum mTP);
    }
}
