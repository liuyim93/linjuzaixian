using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class Announcement:Entity
    {
        public virtual string Title
        {
            set;
            get;
        }
    }
}
