using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IShoppingCartRepository : IRepository<ShoppingCart>
    {
        List<ShoppingCart> getShoppingCartBySystemUser(string SystemUserID);
        //IList<ShoppingCart> Search(List<DataFilter> termList);
        //IList<ShoppingCart> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
