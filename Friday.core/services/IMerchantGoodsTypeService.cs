using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IMerchantGoodsTypeService
    {
        MerchantGoodsType Load(string id);
        void Save(MerchantGoodsType merchantGoodsType);
        void Update(MerchantGoodsType merchantGoodsType);
        void Delete(string id);
        IList<MerchantGoodsType> Search(List<DataFilter> termList);
        IList<MerchantGoodsType> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<MerchantGoodsType> GetGoodsTypeByMerchantID(string mid);
        MerchantGoodsType GetGoodsTypeByTypeNameAndMerchantID(string mname, string mid);
        bool IsHaveTheSameName(string name);
    }
}
