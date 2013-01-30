using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class RestaurantCart:Entity
    {
        public RestaurantCart()
        {
            CartOfFoods = new Iesi.Collections.Generic.HashedSet<CartOfFood>();

        }

        {
            set;

            get;
        }


        //Order 1:N OrederFood
        public virtual Iesi.Collections.Generic.ISet<CartOfFood> CartOfFoods
        {
            set;

            get;
        }

        public virtual double Price  //订单总价
        {
            get;
            set;
        }

        public virtual Restaurant Restaurant
        {
            get;

            set;
        }

   
        public virtual double SendPrice
        {
            set;

            get;
        }

    }
}
