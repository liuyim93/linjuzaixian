using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IFoodService
    {
        IList<Food> GetFoodByRestaurantIDOrderByMonthAmountDesc(string restaurantID);
        Food Load(string id);
        void Save(Food food);
        void Update(Food food);
        void Delete(string id);
        IList<Food> Search(List<DataFilter> termList);
        IList<Food> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<Food> GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(string restaurantID, string keyword, double price1, double price2, string orderType);
        IList<Food> GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(string restaurantID, string keyword, double price1, double price2, string orderType, int start, int limit, out int total);
       
    }
}
