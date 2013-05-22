using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class Area
    {
        public Area()
        {
            createTime = DateTime.Now;
            isDelete = false;
        }

        public virtual int areaid { get; set; }

        public virtual DateTime createTime { get; set; }

        public virtual bool isDelete { get; set; }

        public virtual string name { get; set; }

        public virtual string areacode { get; set; }

        public virtual bool leaf { get; set; }

        public virtual int parentID { get; set; }

        public virtual int tLevel { get; set; }

        public virtual string parentcode { get; set; }

        public virtual string shortname { get; set; }

        public virtual Iesi.Collections.Generic.ISet<School> schools { get; set; }
    }
}
