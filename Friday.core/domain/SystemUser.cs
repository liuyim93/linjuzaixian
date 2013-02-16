using System;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;
using friday.core.EnumType;

namespace friday.core.domain
{
    public class SystemUser:Entity
    {
        public SystemUser()
        {
            // TODO: Complete member initialization
        }

        public SystemUser(string id): this()
        {
            this.Id = id;
        }


        //SyetemUser 1:N Order
        public virtual Iesi.Collections.Generic.ISet<MyOrder> Orders
        {
            get;

            set;
        }

        public virtual ShoppingCart ShoppingCart
        {
            get;

            set;
        }
        public virtual RestaurantCart RestaurantCart
        {
            get;

            set;
        }
        public virtual RentCart RentCart
        {
            get;

            set;
        }
        public virtual Iesi.Collections.Generic.ISet<Address> Addresses
        {
            get;

            set;
        }
        /// <remarks>真实姓名</remarks>
        public virtual string Name
        {
            get;

            set;

        }

        //public virtual string LoginName
        //{
        //    get;

        //    set;

        //}

        //public virtual string Password
        //{
        //    get;

        //    set;

        //}

        ///<remarks>是否匿名用户</remarks>
        public virtual int IsAnonymous
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
        public virtual LoginUser LoginUser
        {
            get;
            set;
        }



    
    }
}
