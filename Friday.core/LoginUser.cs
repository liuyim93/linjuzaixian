using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class LoginUser:Entity
    {
        public virtual string LoginName
        {
            get;

            set;

        }

        public virtual string Password
        {
            get;

            set;

        }

        public virtual bool IsAdmin
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }

        public virtual SystemUser SystemUser
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }

        public virtual Merchant Merchant
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }
    }
}
