using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface ICartOfCommodityRepository : IRepository<CartOfCommodity>
    {
        List<CartOfCommodity> getCommoditiesByShoppingCart(string ShoppingCartID);
        CartOfCommodity getCommodityBySystemUserIDAndCommodityID(string SystemUserID, string CommodityID, bool isDelete);
        //IList<CartOfCommodity> Search(List<DataFilter> termList);
        //IList<CartOfCommodity> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
