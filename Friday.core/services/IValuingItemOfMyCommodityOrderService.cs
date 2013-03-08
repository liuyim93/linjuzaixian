using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IValuingItemOfMyCommodityOrderService
    {
        ValuingItemOfMyCommodityOrder Load(string id);
        void Save(ValuingItemOfMyCommodityOrder valuingItemOfMyCommodityOrder);
        void Update(ValuingItemOfMyCommodityOrder valuingItemOfMyCommodityOrder);
        void Delete(string id);
        IList<ValuingItemOfMyCommodityOrder> GetAll();
    }
}
