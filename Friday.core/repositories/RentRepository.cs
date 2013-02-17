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
    public class RentRepository : Repository<Rent>, IRentRepository
    {


        public Rent SearchByShortName(string name)
        {
            var q = Session.CreateQuery(@"select rt  from   Rent as  rt   where  rt.ShortName=:rtshortname ")
                      .SetString("rtshortname", name).UniqueResult<Rent>(); ;

            return q;
        }




    }
     
}
