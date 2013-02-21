using System;
using friday.core.domain;
using friday.core.components;
using System.Collections.Generic;

namespace friday.core.repositories
{
    public interface IMerchantGoodsTypeRepository : IRepository<MerchantGoodsType>
    {
        IList<MerchantGoodsType> GetGoodsTypeByMerchantID(string mid);
    }
}
