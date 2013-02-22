using System;
using friday.core.domain;
using friday.core.components;
namespace friday.core.repositories
{
    public interface IHouseRepository:IRepository<House>
    {
        System.Collections.Generic.IList<House> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<House> Search(System.Collections.Generic.List<DataFilter> termList, System.Collections.Generic.List<Rent> shopList, int start, int limit);
        System.Collections.Generic.IList<House> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}
