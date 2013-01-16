using System;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;
using friday.core.EnumType;

namespace friday.core.domain
{
    public class SystemUser : Customer
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

        public virtual string Description
        {
            get;

            set;

        }



        public virtual ISet<FeedBack> FeedBack
        {
            get;

            set;
        }

        public virtual ISet<MyFavorite> Favorite
        {
            get;

            set;
        }
       
    
    }
}
