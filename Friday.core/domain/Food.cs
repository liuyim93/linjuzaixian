﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
namespace friday.core.domain
{
    public class Food : friday.core.AbstractCommodity
    {

        public Food()
        {
            // TODO: Complete member initialization
        }

        public Food(string id):this()
        {
            this.Id = id;
        }


     

        //public  virtual Iesi.Collections.Generic.ISet<MyFavorite> Favorite
        //{
        //    set;

        //    get;
        //}
        //Shop 1:N Food
        public virtual Restaurant Restaurant
        {
            get;
            set;
        }
    }
}
