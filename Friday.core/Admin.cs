using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Admin:Entity
    {
        /// <remarks>真实姓名</remarks>
        public virtual string Name
        {
            get;

            set;

        }

      

        //2013-01-24 basilwang administrator shopadmin restaurantadmin rentadmin 
        public virtual int AdminType
        {
            get;

            set;

        }
        public virtual int Merchant
        {
            get;
            set;
        }

        public virtual string Tel
        {
            get;

            set;

        }

        public virtual string Email
        {
            get;

            set;

        }

        public virtual string Description
        {
            get;

            set;

        }
    }
}
