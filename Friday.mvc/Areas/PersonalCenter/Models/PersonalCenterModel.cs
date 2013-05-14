using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.PersonalCenter.Models
{
    public class PersonalCenterModel
    {
        public PersonalCenterModel()
        {
            FavMerchants = new List<friday.core.Merchant>();
            CartOfCommodities = new List<friday.core.CartOfCommodity>();
            Commodities = new List<friday.core.Commodity>();
        }

        public IList<friday.core.Merchant> FavMerchants { get; set; }

        public List<friday.core.CartOfCommodity> CartOfCommodities { get; set; }

        public IList<friday.core.Commodity> Commodities { get; set; }

        public friday.core.domain.SystemUser systemUser { get; set; }
    }
}