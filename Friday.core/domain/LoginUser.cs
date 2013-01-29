﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.EnumType;

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
            get;
            set;
        }

        public virtual SystemUser SystemUser
        {
            get;
            set;
        }


        /// <summary>
        /// admin,shopowner,shopxiaoer,rentowner,rentxiaoer,restaurantowner,restaurantxiaoer,restaurantdelivery,shopdelivery
        /// </summary>
        public virtual UserType UserType
        {
            get;
            set;
        }
        public virtual Iesi.Collections.Generic.ISet<LoginUserOfMerchant> LoginUserOfMerchants
        {
            get;
            set;
        }
    }
}
