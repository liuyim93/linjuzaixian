using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace friday.core.components
{
    public class DataFilter
    {
        public string type { get; set; }
        public string value { get; set; }
        public string valueForCompare { get; set; }
        public string comparison { get; set; }
        public List<DataFilter> field{get; set;}
    }
}
