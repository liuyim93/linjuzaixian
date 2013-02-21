using System;
using friday.core.domain;
using friday.core.components;
namespace friday.core.repositories
{
    public interface ICommodityRepository:IRepository<Commodity>
    {
        System.Collections.Generic.IList<Commodity> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<Commodity> Search(System.Collections.Generic.List<DataFilter> termList, System.Collections.Generic.List<Shop> shopList, int start, int limit);
        System.Collections.Generic.IList<Commodity> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}
