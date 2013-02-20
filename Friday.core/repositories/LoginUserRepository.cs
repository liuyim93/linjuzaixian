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
    public class LoginUserRepository : Repository<LoginUser>, ILoginUserRepository
    {

        public LoginUser GetLoginUserByLoginName(string LoginName)
        {
            var q = Session.CreateQuery(@"select distinct u from LoginUser as u where u.IsDelete=false and u.LoginName=:LoginName")
                  .SetString("LoginName", LoginName);

            return q.UniqueResult<LoginUser>();
        }

    }
     
}
