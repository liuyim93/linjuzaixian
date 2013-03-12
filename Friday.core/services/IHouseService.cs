using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IHouseService
    {
        IList<House> GetHouseByRentIDOrderByMonthAmountDesc(string rentID);
        House Load(string id);
        void Save(House house);
        void Update(House house);
        void Delete(string id);
        IList<House> Search(List<DataFilter> termList);
        IList<House> Search(List<DataFilter> termList, int start, int limit, out long total);
     }
}
