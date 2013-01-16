using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
namespace friday.core.domain
{
    public class Food : Entity
    {
        public virtual String Name
        {
            get;

            set;
        }
        public virtual double Price
        {
            get;

            set;

        } 
        public virtual ShopGoodsType GoodsType
        {
            get;

            set;
        }
        public virtual int  MonthAmount
        {
            get;

            set;
        }
        public virtual string Image
        {
            get;

            set;

        }
        //Shop 1:N Food
        public virtual Shop Shop
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
