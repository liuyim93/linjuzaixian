﻿using System;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
namespace friday.core.domain
{
    public class ShoppingCart:Entity
    {
        public virtual Customer Customer
        {
            set;

            get;
        }


        //Order 1:N OrederFood
        public virtual ISet<CartOfCommodity> CartOfCommodities
        {
            set;

            get;
        }

        public virtual double Price  //订单总价
        {
            get;
            set;
        }

        public virtual Shop Shop
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