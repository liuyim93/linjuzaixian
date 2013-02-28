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
        

        public virtual SystemRole SystemRole
        {
            get;

            set;

        }

        public virtual SystemMenu SystemMenu
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
