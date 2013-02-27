using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class Category : BaseObject
    {
        //public Category()
        //{
        //    CategoryLogs = new Iesi.Collections.Generic.HashedSet<CategoryLog>();

        //}

        public virtual int CategoryID
        {
            get;
            set;
        }
        public virtual string CategoryName
        {
            get;
            set;
        }

        public virtual Iesi.Collections.Generic.ISet<CategoryLog> CategoryLogs
        {
            get;
            set;
        }
    }
}
