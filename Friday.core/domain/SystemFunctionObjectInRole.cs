using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;

namespace friday.core.domain
{
    public  class SystemFunctionObjectInRole : Entity
    {
        

        public virtual SystemRole Role
        {
            get;

            set;

        }

        public virtual SystemFunctionObject SystemFunctionObject
        {
            get;

            set;

        }

        public virtual bool Enabled
        {
            get;
            set;
        }
        public virtual bool Editable
        {
            get;
            set;
        }
        public virtual bool Deletable
        {
            get;
            set;
        }
        
    }
}
