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
    public class LoginUserOfMerchantRepository : Repository<LoginUserOfMerchant>, ILoginUserOfMerchantRepository
    {

    

        public LoginUser GetMerchantLoginUserBy(string MerchantId)
        {

            var q = Session.CreateQuery(@"select  u from LoginUserOfMerchant  as lu   left join  lu.LoginUser as u  where  lu.Merchant=:mchtId ")
                 .SetString("mchtId", MerchantId);

            return q.UniqueResult<LoginUser>();
        }

    }
     
}
