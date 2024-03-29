﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Address:Entity
    {
        public virtual string AddressName
        {
            get;

            set;
        }

        public virtual string StreetAddress
        {
            get;

            set;
        }

        public virtual string Tel
        {
            get;

            set;
        }

        public virtual string prov
        {
            get;

            set;
        }

        public virtual string city
        {
            get;

            set;
        }
        public virtual string dist
        {
            get;

            set;
        }
        public virtual string provName
        {
            get;

            set;
        }
        public virtual string cityName
        {
            get;

            set;
        }
        public virtual string distName
        {
            get;

            set;
        }
        public virtual string post
        {
            get;

            set;
        }
        public virtual string BackupTel
        {
            get;

            set;
        }

        public virtual string Linkman
        {
            get;

            set;
        }

        public virtual string Email
        {
            get;

            set;
        }

        public virtual string Weixin
        {
            get;

            set;
        }

        public virtual string QQ
        {
            get;

            set;
        }

        public virtual SystemUser SystemUser
        {
            get;

            set;
        }
    }
}
