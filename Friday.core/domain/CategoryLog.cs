using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class CategoryLog:BaseObject
    {
        public virtual int CategoryLogID
        {
            get;
            set;
        }
        public virtual Category Category
        {
            get;set;
        }
        public virtual Log Log
        {
            get;
            set;
        }
    }
}
