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
            this.cartOfCommodities = new List<IList<CartOfCommodity>>();
            this.skuProps = new List<IList<IList<string>>>();
            this.skuValues = new List<IList<IList<string>>>();
        }

        public List<Address> addresses { get; set; }
        public IList<Shop> shops { get; set; }
        public int sum { get; set; }
        public IList<IList<CartOfCommodity>> cartOfCommodities { get; set; }
        public IList<IList<IList<string>>> skuProps { get; set; }
        public IList<IList<IList<string>>> skuValues { get; set; }
    }
}