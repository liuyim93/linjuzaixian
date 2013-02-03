﻿using System;
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
    public class SystemUserRepository : Repository<SystemUser>,ISystemUserRepository
    {
        public SystemUserRepository()
        {

        }
        public IList<SystemUser> GetSystemUsersByPageList(int start, int limit, out long total)
        {
            var q = Session.CreateQuery(@"select distinct u from SystemUser as u where u.IsDelete=false and u.IsAnonymous=false")
                  .SetFirstResult(start)
                  .SetMaxResults(limit).List<SystemUser>();
            total = Session.CreateQuery(@"select count(distinct u) from SystemUser as u where u.IsDelete=false and u.IsAnonymous=false")
                 .UniqueResult<long>();

            return q;
        }
    }
     
}
