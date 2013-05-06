using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using friday.core;
using friday.core.domain;
using MvcPaging;

namespace Friday.mvc.Models
{
    public class SearchModel
    {
        public SearchModel()
        {
            int count ;
            int pageSize;
            int currentPage;
           int pageNum;

            SingleMerchant = new Merchant();
            //SingleRestaurant = new Restaurant();
            //SingleRent = new Rent();
            SingleShop = new Shop();
            //SingleMerchantGoodsType = new MerchantGoodsType();

            //IList<MerchantGoodsType> merchantGoodsTypes = new List<MerchantGoodsType>();
            //IList<Food> Foods = new List<Food>();
            //IList<House> Houses = new List<House>();
            IList<Commodity> Commoditys = new List<Commodity>();
        }

        public Merchant SingleMerchant { get; set; }
        //public Restaurant SingleRestaurant { get; set; }
        //public Rent SingleRent { get; set; }
        public Shop SingleShop { get; set; }
        //public MerchantGoodsType SingleMerchantGoodsType { get; set; }

        public int count { get; set; }
        public int currentPage { get; set; }
        public int pageNum { get; set; }
        //public IList<MerchantGoodsType> merchantGoodsTypes { get; set; }
        //public IList<Food> Foods { get; set; }
        //public IList<House> Houses { get; set; }
        public IList<Commodity> Commoditys { get; set; }
     
    }
}