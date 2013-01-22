using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class Activity:Entity
    {
        public virtual string Name
        {
            set;

            get;
        }

        public virtual string Description
        {
            set;

            get;
        }

        public virtual string Matters
        {
            set;

            get;
        }

        public virtual string Image
        {
            set;

            get;
        }
    }
}
