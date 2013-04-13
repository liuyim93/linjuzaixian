using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class SKU : BaseObject
    {
        public SKU()
        {
            SKUProps = new Iesi.Collections.Generic.HashedSet<SKUProp>();
        }
        public int skuId
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
        public virtual Iesi.Collections.Generic.ISet<SKUProp> SKUProps
        {
            get;
            set;
        }
    }
}
