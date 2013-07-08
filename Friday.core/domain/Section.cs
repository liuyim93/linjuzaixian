using System;
using System.Linq;
using System.Text;
using friday.core.domain;
using Iesi.Collections.Generic;
using friday.core.EnumType;
using System.Collections.Generic;
using friday.core;

namespace friday.core.domain
{
    /// <remarks>新闻栏目类</remarks>
    public class Section : TreeNode
    {
        public virtual string SectionCode
        {
            set;

            get;
        }
        public virtual string Description
        {
            get;

            set;

        }

        //public virtual Iesi.Collections.Generic.ISet<DataResource> DataResources
        //{
        //    get;
        //    set;
        //}
         
     
    }
}
