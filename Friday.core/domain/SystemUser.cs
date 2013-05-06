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
            Orders = new Iesi.Collections.Generic.HashedSet<MyOrder>();
            Addresses = new Iesi.Collections.Generic.HashedSet<Address>();
            //RestaurantCarts = new Iesi.Collections.Generic.HashedSet<RestaurantCart>();
            ShoppingCarts = new Iesi.Collections.Generic.HashedSet<ShoppingCart>();
            //RentCarts = new Iesi.Collections.Generic.HashedSet<RentCart>();
        }

        public SystemUser(string id): this()
        {
            this.Id = id;
            Orders = new Iesi.Collections.Generic.HashedSet<MyOrder>();
            Addresses = new Iesi.Collections.Generic.HashedSet<Address>();
            //RestaurantCarts = new Iesi.Collections.Generic.HashedSet<RestaurantCart>();
            ShoppingCarts = new Iesi.Collections.Generic.HashedSet<ShoppingCart>();
            //RentCarts = new Iesi.Collections.Generic.HashedSet<RentCart>();
        }


        //SyetemUser 1:N Order
        public virtual Iesi.Collections.Generic.ISet<MyOrder> Orders
        {
            get;

            set;
        }

        public virtual Iesi.Collections.Generic.ISet<ShoppingCart> ShoppingCarts
        {
            get;

            set;
        }
        //public virtual Iesi.Collections.Generic.ISet<RestaurantCart> RestaurantCarts 
        //{
        //    get;

        //    set;
        //}
        //public virtual Iesi.Collections.Generic.ISet<RentCart> RentCarts
        //{
        //    get;

        //    set;
        //}
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
        public virtual bool IsAnonymous
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


        public virtual Iesi.Collections.Generic.ISet<MyFavorite> MyFavorites
        {
            get;

            set;
        }
    
    }
}
