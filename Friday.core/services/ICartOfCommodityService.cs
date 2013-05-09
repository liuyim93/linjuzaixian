using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ICartOfCommodityService
    {
        CartOfCommodity Load(string id);
        void Save(CartOfCommodity CartOfCommodity);
        void Update(CartOfCommodity CartOfCommodity);
        void Delete(string id);
        void PhysicsDelete(string id);
        List<CartOfCommodity> getCommoditiesByShoppingCart(string ShoppingCartID);
        CartOfCommodity getCommodityBySystemUserIDAndSkuID(string SystemUserID, string SkuID, bool isDelete);
    }
}
