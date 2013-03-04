﻿using System;
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
        void Save(SchoolOfMerchant restaurant);
        void Update(SchoolOfMerchant restaurant);
        void Delete(string id);
        SchoolOfMerchant SearchByShortName(string name);
        IList<SchoolOfMerchant> Search(List<DataFilter> termList);
        IList<SchoolOfMerchant> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
