using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.domain
{
    public class PropID :BaseObject//Entity
    {
        public PropID()
        {
            CreateTime = DateTime.Now;
            PropValues = new Iesi.Collections.Generic.HashedSet<PropValue>();
        }
        public virtual int Id
        {
            get;
            set;
        }
        public virtual string PropIDName
        {
            get;
            set;
        }
        public virtual Merchant Merchant
        {
            get;

            set;
        } 
        public virtual DateTime CreateTime 
        { 
            get; 
            protected set; 
        }
        public virtual Iesi.Collections.Generic.ISet<PropValue> PropValues
        {
            get;
            set;
        }
    }
}
