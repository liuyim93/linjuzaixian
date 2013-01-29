using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class Rent:Merchant
    {

        //Shop 1:N Food
        public virtual Iesi.Collections.Generic.ISet<House> Houses
        {
            get;

            set;
        }

        //public virtual Iesi.Collections.Generic.ISet<MyHouseOrder> MyHouseOrders
        //{
        //    get;

        //    set;
        //}

    }
}
