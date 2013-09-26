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

        public override string ToString()
        {
            string result=string.Empty;
            foreach (SkuProp prop in SKUProps)
            {
                result+=prop.PropID.PropIDName +"--"+ prop.PropValue.PropValueName+".";
            }
            return result;
        }
        //2013-04-16 basilwang to generate skumap key in cshtml
        public virtual string SKUPropString
        {

            set;
            get;


        }
    }
}
