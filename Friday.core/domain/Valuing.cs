using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Valuing:Entity
    {
        public Valuing()
        {
            ValuingComments = new Iesi.Collections.Generic.HashedSet<ValuingComments>();
        }

        public virtual double AverageScore
        {
            get;

            set;
        }


        public virtual Merchant Merchant
        {
            get;

            set;
        }

     

        public virtual string ValuingContent
        {
            get;
            set;
        }
        public virtual LoginUser LoginUser
        {
            get;
            set;
        }

        public virtual Iesi.Collections.Generic.ISet<ValuingComments> ValuingComments
        {
            get;
            set;
        }
    }
}
