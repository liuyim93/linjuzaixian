using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IValuingItemOfMyFoodOrderService
    {
        ValuingItemOfMyFoodOrder Load(string id);
        void Save(ValuingItemOfMyFoodOrder valuingItemOfMyFoodOrder);
        void Update(ValuingItemOfMyFoodOrder valuingItemOfMyFoodOrder);
        void Delete(string id);
        IList<ValuingItemOfMyFoodOrder> GetAll();
    }
}
