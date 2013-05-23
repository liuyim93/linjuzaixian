using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
namespace friday.core.domain
{
    public class School : TreeNode
    {
        public School()
        {
            SchoolOfMerchants = new Iesi.Collections.Generic.HashedSet<SchoolOfMerchant>();
        }

        public virtual string AreaCode
        {
            set;

            get;
        }

        public virtual string ParentCode
        {
            set;

            get;
        }

        public virtual string ShortName
        {
            set;

            get;
        }

        public virtual string PinYin
        {
            set;

            get;

        }

        public virtual Iesi.Collections.Generic.ISet<SchoolOfMerchant> SchoolOfMerchants
        {

            set;

            get;
        }

        public virtual Iesi.Collections.Generic.ISet<SystemUser> SystemUsers
        {
            get;

            set;

        }
    }
}
