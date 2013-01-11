using System;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;
using friday.core.EnumType;
namespace friday.core.domain
{
    public class SystemUser : Entity
    {
        /// <remarks>真实姓名</remarks>
        public virtual string Name
        {
            get;

            set;

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

        ///<remarks>用户类型，0为个人用户，1为企业用户</remarks>
        public virtual int UserType
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

        public virtual string Address
        {
            get;

            set;

        }

        public virtual string Description
        {
            get;

            set;

        }


        //SyetemUser 1:N Order
        public virtual ISet<MyOrder> Orders
        {
            get;

            set;
        }
        public virtual ISet<MyFavorite> Favorite
        {
            get;

            set;
        }

        public virtual ISet<FeedBack> FeedBack
        {
            get;

            set;
        }
        //1:1

        public virtual ShoppingCart ShoppingCart
        {
            get;

            set;
        }
       
    
    }
}
