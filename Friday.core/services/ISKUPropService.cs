﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.services
{
    public interface ISKUPropService
    {
        IList<SKUProp> GetSKUPropsBySkuID(string SKU_ID, int start, int limit, out long total);
        SKUProp Load(string id);
        void Save(SKUProp skuProp);
        void Update(SKUProp skuProp);
        void Delete(string id);
    }
}