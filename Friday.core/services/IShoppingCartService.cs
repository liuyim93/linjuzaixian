using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IShoppingCartService
    {
        ShoppingCart Load(string id);
        void Save(ShoppingCart ShoppingCart);
        void Update(ShoppingCart ShoppingCart);
        void Delete(string id);
        ShoppingCart getShoppingCartBySystemUser(string SystemUserID);
    }
}
