using System;
using friday.core.domain;
using friday.core.components;
namespace friday.core.repositories
{
    public interface IHouseStatisticRepository:IRepository<HouseStatistic>
    {

        System.Collections.Generic.IList<HouseStatistic> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<HouseStatistic> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}
