using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface ISKUService
    {
        SKU Load(string id);
        void Save(SKU sku);
        void Update(SKU sku);
        void Delete(string id);
    }
}