using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.domain
{
    public class PropID : BaseObject
    {
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
    }
}
