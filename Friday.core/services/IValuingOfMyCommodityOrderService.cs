using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface IValuingOfMyCommodityOrderService
    {
        IList<ValuingOfMyCommodityOrder> GetValuingOfMyCommodityOrderByCommodityID(string commodityID);
        ValuingOfMyCommodityOrder Load(string id);
        void Save(ValuingOfMyCommodityOrder valuingOfMyCommodityOrder);
        void Update(ValuingOfMyCommodityOrder valuingOfMyCommodityOrder);
        void Delete(string id);
        IList<ValuingOfMyCommodityOrder> Search(List<DataFilter> termList);
        IList<ValuingOfMyCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
