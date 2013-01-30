using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Valuing:Entity
    {
        public virtual int AverageScore
        {
            get;

            set;
        }


        public virtual bool IsShownAnonymous
        {
            get;

            set;
        }

        public virtual Iesi.Collections.Generic.ISet<ValuingItem> ValuingItems
        {
            get;

            set;
        }

        public virtual string ValuingContent
        {
            get;
            set;
        }
        public virtual LoginUser FromLoginUser
        {
            get;
            set;
        }
        public virtual LoginUser ToLoginUser
        {
            get;
            set;
        }
    }
}
