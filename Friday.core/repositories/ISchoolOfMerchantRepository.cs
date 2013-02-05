using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface ISchoolOfMerchantRepository : IRepository<SchoolOfMerchant>
    {
         string GetSchoolNamesByMerchantID(string rentid);
         void DeleteSchoolOfMerchantByMerchantID(string MID);
    }
}
