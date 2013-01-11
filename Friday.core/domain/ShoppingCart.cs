using System;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
namespace friday.core.domain
{
    public class ShoppingCart:Entity
    {
        public virtual SystemUser SystemUser
        {
            set;

            get;
        }

        //Order 1:N OrederFood
        public virtual ISet<CartFood> CartFoods
        {
            set;

            get;
        }

        public virtual double Price  //订单总价
        {
            get;
            set;
        }

        public virtual string ShopID
        {
            get;

            set;
        }

        public virtual string ShopName
        {
            set;

            get;
        }
        public virtual double SendPrice
        {
            set;

            get;
        }



    }
}
