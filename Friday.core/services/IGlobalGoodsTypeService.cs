using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IGlobalGoodsTypeService
    {
        GlobalGoodsType Load(string id);
        IList<GlobalGoodsType> GetChildrenFromParentID(string ParentID);
        bool IsHaveChild(GlobalGoodsType GlobalGoodsType);
        void Save(GlobalGoodsType globalGoodsType);
        void Update(GlobalGoodsType globalGoodsType);
        void Delete(string id);
        IList<GlobalGoodsType> Search(List<DataFilter> termList);
        IList<GlobalGoodsType> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<GlobalGoodsType> GetAll();
        GlobalGoodsType GetGlobalGoodsTypeByName(string Name);
    }
}
