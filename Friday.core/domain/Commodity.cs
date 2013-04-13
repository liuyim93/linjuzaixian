using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Commodity:AbstractCommodity
    {
         public Commodity()
        {
            Skus = new Iesi.Collections.Generic.HashedSet<Sku>();
        }

         public Commodity(string id): this()
        {
            this.Id = id;
        }
        public virtual Shop Shop
        {
            get;
            set;
        }
        public virtual Iesi.Collections.Generic.ISet<Sku> Skus
        {
            get;

            set;
        }
    }
}
