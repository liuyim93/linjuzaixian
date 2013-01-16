using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
namespace friday.core.domain
{
    public class Food : friday.core.Commodity
    {
        
     
        public virtual int  MonthAmount
        {
            get;

            set;
        }
      


        public virtual Iesi.Collections.Generic.ISet<MyFavorite> Favorite
        {
            set;

            get;
        }
    }
}
