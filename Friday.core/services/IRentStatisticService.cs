using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IRentStatisticService
    {
        RentStatistic Load(string id);
        void Save(RentStatistic rentStatistic);
        void Update(RentStatistic rentStatistic);
        void Delete(string id);
        IList<RentStatistic> Search(List<DataFilter> termList);
        IList<RentStatistic> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
