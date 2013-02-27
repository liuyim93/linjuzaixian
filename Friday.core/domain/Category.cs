using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class Category
    {
        public virtual int CategoryID
        {
            get;
            set;
        }
        public virtual string CategoryName
        {
            get;
            set;
        }
    }
}
