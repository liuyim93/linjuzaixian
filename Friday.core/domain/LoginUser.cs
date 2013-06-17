using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core
{
    public class LoginUser:Entity
    {
        public LoginUser()
        {
            LoginUserOfMerchants = new Iesi.Collections.Generic.HashedSet<LoginUserOfMerchant>();
            UserInRoles = new Iesi.Collections.Generic.HashedSet<UserInRole>();
        }

        public LoginUser(string id): this()
        {
            this.Id = id;
        }

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
        public virtual SystemRole SystemRole
        {
            get;
            set;
        }

        /// <summary>
        /// admin,shopowner,shopxiaoer,rentowner,rentxiaoer,restaurantowner,restaurantxiaoer,restaurantdelivery,shopdelivery
        /// </summary>
        //public virtual UserTypeEnum UserType
        //{
        //    get;
        //    set;
        //}
        public virtual Iesi.Collections.Generic.ISet<DataResource> DataResources
        {
            get;
            set;
        }
        public virtual Iesi.Collections.Generic.ISet<UserInRole> UserInRoles
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
