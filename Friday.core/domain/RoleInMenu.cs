using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;
using friday.core.domain;

namespace friday.core
{
    public  class RoleInMenu : Entity
    {
        

        public virtual SystemRole Role
        {
            get;

            set;

        }

        public virtual SystemMenu Menu
        {
            get;

            set;

        }

        public virtual string ButtonID
        {
            get;
            set;
        }
       
    }
}
