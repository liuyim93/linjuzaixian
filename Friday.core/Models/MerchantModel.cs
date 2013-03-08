using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Friday.core.Models
{
    public class MerchantModel
    {
        public string actCode { get; set; }

        public string actCodeName { get; set; }

        public string actDesc { get; set; }

        public string activityType { get; set; }

        public string bigPicBrand { get; set; }

        public string brandDesc { get; set; }

        public string brandId { get; set; }

        public string brandName { get; set; }

        public string cat { get; set; }

        public string dx { get; set; }

        public string isCol { get; set; }

        public string lastBitOfSCM { get; set; }

        public string linkedUrl { get; set; }

        public string logo { get; set; }

        public string logoPicType { get; set; }

        public string resource { get; set; }

        public bool resourceId4BI { get; set; }

        public string score { get; set; }

        public string source { get; set; }

        public string statUrl { get; set; }
    }
}