using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.repositories
{
    public class ShopRepository : Repository<Shop>, IShopRepository
    {


        public Shop SearchByShortName(string name)
        {
            var q = Session.CreateQuery(@"select sp  from   Shop as  sp   where  sp.ShortName=:spshortname ")
                      .SetString("spshortname", name).UniqueResult<Shop>(); ;

            return q;
        }




    }
     
}
