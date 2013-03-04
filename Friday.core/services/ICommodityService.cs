using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ICommodityService
    {
        Commodity Load(string id);
        void Save(Commodity commodity);
        void Update(Commodity commodity);
        void Delete(string id);
        IList<Commodity> Search(List<DataFilter> termList);
        IList<Commodity> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<Commodity> Search(List<DataFilter> termList, List<Shop> shopList, int start, int limit);
    }
}
