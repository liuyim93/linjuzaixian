using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using friday.core;
using friday.core.domain;

namespace Friday.mvc.Models
{
    public class OrderModel
    {
        public OrderModel()
        {
            this.addresses = new List<Address>();
            this.shops = new List<Shop>();
            this.commodities = new List<IList<Commodity>>();
            this.skuPropValues = new List<IDictionary<string, string>>();
        }

        public IList<Address> addresses { get; set; }
        public IList<Shop> shops { get; set; }
        public IList<IList<Commodity>> commodities { get; set; }
        public IList<IDictionary<string,string>> skuPropValues { get; set; }

    }
}