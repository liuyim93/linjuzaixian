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
    public class RestaurantRepository : Repository<Restaurant>, IRestaurantRepository
    {


        public Restaurant SearchByShortName(string  name) 
        {
            var q = Session.CreateQuery(@"select s  from   Restaurant as  rt   where  rt.Name=:rname ")
                      .SetString("rname", name).UniqueResult<Restaurant>(); ;
           
            return q;
        }



    }
     
}
