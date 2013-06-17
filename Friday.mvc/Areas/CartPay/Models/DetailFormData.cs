﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace Friday.mvc.Areas.CartPay.Models
{
    [DataContract(Namespace = "Friday.mvc.Areas.CartPay.Models")]
    public class DetailFormData
    {
        [DataMember(Order = 1)]
        public string deliveryCityCode
        {
            get;
            set;
        }
        [DataMember(Order = 2)]
        public int campaignId
        {
            get;
            set;
        }
        [DataMember(Order = 3)]
        public List<DetailFormDataItem> items
        {
            get;
            set;
        }
    }

    public class DetailFormDataItem
    {
        public string skuId
        {
            get;
            set;
        }
        public string itemId
        {
            get;
            set;
        }
        public string quantity
        {
            get;
            set;
        }
        public string serviceInfo
        {
            get;
            set;
        }
    }
}