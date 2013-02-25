using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace friday.core.components
{
    public class FunctionTag
    {
        public string ParentTag { get; set; }
        public bool Enable { get; set; }
        public bool Edit { get; set; }
        public bool Delete { get; set; }
        private string tagName;
        public string Name { get; set; }
        public string TagName
        {
            get
            {
                if( string.IsNullOrEmpty( ParentTag ) == false )
                {
                    return string.Format( "{0}.{1}", ParentTag, tagName );
                }
                else
                    return tagName;
            }
            set
            {
                tagName = value;
                this.Name = value;
            }
        }
    }

}
