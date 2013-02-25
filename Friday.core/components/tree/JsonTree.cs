using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public class JsonTree
    {
        public string id { get; set; }
        public string text { get; set; }
        public string value { get; set; }
        public bool showcheck { get; set; }
        public bool isexpand { get; set; }
        public string target { get; set; }
        public string rel { get; set; }
        public byte checkstate { get; set; }
        public bool hasChildren { get; set; }
        public List<JsonTree> ChildNodes { get; set; }
        public bool complete { get; set; }
        /*2011-02-26 王华杰 增加样式*/
        public string classes { get; set; }
    }
}
