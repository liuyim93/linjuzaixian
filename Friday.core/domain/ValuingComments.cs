using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class ValuingComments:Entity
    {
        //0表示从用户到商家、1表示从商家到用户
        public virtual int Direction
        {
            get;

            set;
        }


        public virtual int TrackIndex
        {
            get;

            set;
        }
     

        public virtual string Comments
        {
            get;

            set;
        }

        public virtual Valuing Valuing
        {
            get;

            set;
        }

    }
}
