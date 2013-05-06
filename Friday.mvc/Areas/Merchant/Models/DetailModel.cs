using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using friday.core;
using friday.core.domain;

namespace Friday.mvc.Models
{
    public class DetailModel
    {
        public DetailModel()
        {
            Merchant = new Merchant();

            ValuingOfMyCommodityOrders = new IList<ValuingOfMyCommodityOrder>[12];
            //ValuingOfMyFoodOrders = new IList<ValuingOfMyFoodOrder>[12];
            //ValuingOfMyHouseOrders = new IList<ValuingOfMyHouseOrder>[12];

            //Foods = new List<Food>();
            //Houses = new List<House>();
            Commoditys = new List<Commodity>();

            for (int i = 0; i < this.ValuingOfMyCommodityOrders.Length; i++)
            {
                ValuingOfMyCommodityOrders[i] = new List<ValuingOfMyCommodityOrder>();
            }
            //for (int i = 0; i < this.ValuingOfMyFoodOrders.Length; i++)
            //{
            //    ValuingOfMyFoodOrders[i] = new List<ValuingOfMyFoodOrder>();
            //}
            //for (int i = 0; i < this.ValuingOfMyHouseOrders.Length; i++)
            //{
            //    ValuingOfMyHouseOrders[i] = new List<ValuingOfMyHouseOrder>();
            //}
        }

        public Merchant Merchant { get; set; }

        public Commodity Commodity { get; set; }

        public IList<ValuingOfMyCommodityOrder>[] ValuingOfMyCommodityOrders { get; set; }
        //public IList<ValuingOfMyFoodOrder>[] ValuingOfMyFoodOrders { get; set; }
        //public IList<ValuingOfMyHouseOrder>[] ValuingOfMyHouseOrders { get; set; }

        //public IList<Food> Foods { get; set; }
        //public IList<House> Houses { get; set; }
        public IList<Commodity> Commoditys { get; set; }

    }
}