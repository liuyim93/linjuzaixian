using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISchoolOfMerchantService
    {
        SchoolOfMerchant Load(string id);
        void Save(SchoolOfMerchant schoolOfMerchant);
        void Update(SchoolOfMerchant schoolOfMerchant);
        void Delete(string id);
        string[] GetSchoolNamesAndIdsByMerchantID(string mid);
        void DeleteSchoolOfMerchantByMerchantID(string MID);
    }
}
