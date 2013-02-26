using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;

namespace friday.core.domain
{
    public  class UserInRole : Entity
    {
        

        public virtual SystemRole Role
        {
            get;

            set;

        }

        public virtual LoginUser LoginUser
        {
            get;

            set;

        }
       
    }
}
