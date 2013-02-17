using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class House:AbstractCommodity
    {
         public House()
        {
            // TODO: Complete member initialization
        }

         public House(string id): this()
        {
            this.Id = id;
        }
        public virtual DateTime TimeOfRentFrom
        {
            get;
            set;
        }
        public virtual DateTime TimeOfRentTO
        {
            get;
            set;
        }
        public virtual int DaySpanOfRent
        {
            get;
            set;
        }
        //Shop 1:N Food
        public virtual Rent Rent
        {
            get;
            set;
        }
    }
}
