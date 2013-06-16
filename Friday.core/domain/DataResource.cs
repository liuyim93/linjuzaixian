using System;
using System.Linq;
using System.Text;
using friday.core.domain;
using Iesi.Collections.Generic;
using friday.core.EnumType;
using System.Collections.Generic;

namespace friday.core.domain
{
    public class DataResource: Entity
    {
        public DataResource()
         {
            //DataAttachments=new Iesi.Collections.Generic.HashedSet<DataAttachment>();
         }
        public virtual string Title
        {
            get;

            set;
        }

        public virtual string Description
        {
            get;
            set;
        }

        //public virtual string Publisher
        //{
        //    get;
        //    set;
        //}

        public virtual CheckState CheckState
        {
            get;
            set;
        }

        public virtual string Source
        {
            get;
            set;
        }


        public virtual int TotalViews
        {
            get;
            set;
        }
        public virtual bool isHelp
        {
            get;
            set;
        }

        //public virtual Iesi.Collections.Generic.ISet<DataAttachment> DataAttachments
        //{
        //    get;
        //    set;
        //}


        public virtual Section Section
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
