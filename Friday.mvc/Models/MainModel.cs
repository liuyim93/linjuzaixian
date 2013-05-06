using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using friday.core;
using friday.core.domain;

namespace Friday.mvc.Models
{
    public class MainModel
    {
        public MainModel()
        {
            GlobalGoodsType GlobalGoodsType = new GlobalGoodsType();

            IList<GlobalGoodsType> GlobalGoodsTypes = new List<GlobalGoodsType>();
            IList<GlobalGoodsType> GlobalGoodsTypeTlevelZero = new List<GlobalGoodsType>();
            IList<GlobalGoodsType> GlobalGoodsTypeTlevelFirst = new List<GlobalGoodsType>();
       
         }

        public GlobalGoodsType GlobalGoodsType { get; set; }

        public IList<GlobalGoodsType> GlobalGoodsTypes { get; set; }
        //public IEnumerable<MerchantCategory> MerchantRestaurantCategories { get; set; }
        //public IEnumerable<MerchantCategory> MerchantRentCategories { get; set; }
        public IEnumerable<MerchantCategory> MerchantShopCategories { get; set; }
        
        public IList<GlobalGoodsType> GlobalGoodsTypeTlevelZero { get; set; }
        public IList<GlobalGoodsType> GlobalGoodsTypeTlevelFirst { get; set; }
        //public IEnumerable<Merchant> Rents { get; set; }
        public IEnumerable<Merchant> Shops { get; set; }
        //public IEnumerable<Merchant> Restaurants { get; set; }

        public IEnumerable<Activity> Activities { get; set; }
        //public IEnumerable<Food> Foods { get; set; }
        //public IEnumerable<House> Houses { get; set; }
        public IEnumerable<Commodity> Commoditys { get; set; }
             
    }
}