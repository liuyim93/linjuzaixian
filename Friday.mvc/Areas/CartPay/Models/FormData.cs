using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization;

namespace Friday.mvc.Areas.CartPay.Models
{
    [DataContract(Namespace = "Friday.mvc.Areas.CartPay.Models")]
    public class FormData
    {
        [DataMember(Order = 1)]
        public List<CartItem> cart
        {
            get;
            set;
        }
        [DataMember(Order = 2)]
        public List<string> operate
        {
            get;
            set;
        }
        [DataMember(Order = 3)]
        public string type
        {
            get;
            set;
        }
    }

    public class CartItem
    {
        public int quantity
        {
            get;
            set;
        }
        public string cartId
        {
            get;
            set;
        }
    }
}
