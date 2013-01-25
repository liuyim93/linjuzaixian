using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Message:Entity
    {

        public virtual SystemUser SystemUser
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }

        public virtual Merchant Merchant
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }

        public virtual int Direction
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }

        public String ThreadIndex
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }

        public string Content
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }

        public string TrackIndex
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }
    }
}
