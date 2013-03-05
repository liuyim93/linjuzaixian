using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IHouseStatisticService
    {
        HouseStatistic Load(string id);
        void Save(HouseStatistic houseStatistic);
        void Update(HouseStatistic houseStatistic);
        void Delete(string id);

        IList<HouseStatistic> Search(List<DataFilter> termList);
        IList<HouseStatistic> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
