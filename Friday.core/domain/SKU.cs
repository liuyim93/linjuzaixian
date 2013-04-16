using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.domain
{
    public class Sku : BaseObject
    {
        public Sku()
        {
            SKUProps = new Iesi.Collections.Generic.HashedSet<SkuProp>();
            CreateTime = DateTime.Now;
        }
        public virtual int skuId
        {
            get;
            set;
        }
        public virtual DateTime CreateTime
        {
            get;
            set;
        }
        public virtual double price
        {
            get;

            set;

        }
        public virtual double priceCent
        {
            get;

            set;

        }
        public virtual int stock
        {
            get;

            set;

        }
        public virtual Commodity Commodity
        {
            get;
            set;
        }
        public virtual Iesi.Collections.Generic.ISet<SkuProp> SKUProps
        {
            get;
            set;
        }
    }
}
