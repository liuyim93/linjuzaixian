using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class OutBox:CartBox
    {

        public virtual string Mbno
        {
            set;

            get;

        }

        public virtual DateTime SendTime
        {
            set;

            get;
        }

        public virtual int Comport
        {

            get;

            set;
        }

        public virtual int Report
        {
            set;

            get;
        }

        public virtual string username
        {
            set;

            get;
        }
    }
}
