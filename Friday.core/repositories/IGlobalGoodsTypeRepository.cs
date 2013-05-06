using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface IGlobalGoodsTypeRepository : IRepository<GlobalGoodsType>
    {
        IList<GlobalGoodsType> GetChildrenFromParentID(string ParentID);
        bool IsHaveChild(GlobalGoodsType GlobalGoodsType);
        IList<GlobalGoodsType> Search(List<DataFilter> termList);
        IList<GlobalGoodsType> Search(List<DataFilter> termList, int start, int limit, out long total);
        GlobalGoodsType GetGlobalGoodsTypeByName(string Name);
        IList<GlobalGoodsType> GetGlobalGoodsTypeByTlevel(int level);
         
    }
}