using System;
using friday.core.domain;
using friday.core.components;
using System.Collections.Generic;
namespace friday.core.repositories
{
    public interface IFoodRepository:IRepository<Food>
    {
        IList<Food> GetFoodByRestaurantIDOrderByMonthAmountDesc(string restaurantID);
        System.Collections.Generic.IList<Food> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<Food> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
        IList<Food> GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(string restaurantID, string keyword, double price1, double price2, string orderType);
        IList<Food> GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(string restaurantID, string keyword, double price1, double price2,string goodTypeId, string orderType, int start, int limit, out int total);
        IList<Food> GetFoodByRestaurantIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string restaurantID, string merchantGoodTypeID, int start, int limit, out int total);
   

    }
}
