using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using friday.core;
using friday.core.domain;

namespace Friday.mvc.Models
{
    public class SearchModel
    {
        public SearchModel()
        {
            SingleMerchant = new Merchant();
            SingleRestaurant = new Restaurant();
            SingleRent = new Rent();
            SingleShop = new Shop();
            Foods = new IList<Food>[10];
            Houses = new IList<House>[10];
            Commoditys = new IList<Commodity>[10];

            for (int i = 0; i < this.Foods.Length; i++)
            {
                Foods[i] = new List<Food>();
            }
            for (int i = 0; i < this.Houses.Length; i++)
            {
                Houses[i] = new List<House>();
            }
            for (int i = 0; i < this.Commoditys.Length; i++)
            {
                Commoditys[i] = new List<Commodity>();
            }
        }

        public Merchant SingleMerchant { get; set; }
        public Restaurant SingleRestaurant { get; set; }
        public Rent SingleRent { get; set; }
        public Shop SingleShop { get; set; }

        public IList<Food>[] Foods { get; set; }
        public IList<House>[] Houses { get; set; }
        public IList<Commodity>[] Commoditys { get; set; }
    }
}