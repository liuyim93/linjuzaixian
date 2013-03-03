using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IGlobalGoodsTypeService
    {
        GlobalGoodsType Load(string id);
        void Save(GlobalGoodsType globalGoodsType);
        void Update(GlobalGoodsType globalGoodsType);
        void Delete(string id);
        IList<GlobalGoodsType> Search(List<DataFilter> termList);
    }
}
