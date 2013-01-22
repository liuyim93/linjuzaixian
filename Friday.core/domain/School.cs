using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
namespace friday.core.domain
{
    public class School:Entity
    {

        public virtual string Name
        {
            set;

            get;

        }

        public virtual string ShortName
        {
            set;

            get;
        }
        //public virtual CityNameEnum CityName
        //{
        //    set;

        //    get;

        //}
        //2013-01-07 basilwang don't use CityNameEnum anymore
        public virtual string CityName
        {
            set;

            get;

        }

        public virtual Iesi.Collections.Generic.ISet<SchoolOfMerchant> SchoolOfMerchants
        {

            set;

            get;
        }

        public virtual string Image
        {
            get;

            set;

        }

    }
}
