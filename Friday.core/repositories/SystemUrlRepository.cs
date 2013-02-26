using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.repositories
{
    public class SystemUrlRepository : Repository<SystemUrl>, ISystemUrlRepository
    {
        public SystemUrl GetByUrlPath(string name)
        {
            return Session.CreateQuery(@"select u from SystemUrl as u where u.UrlPath=:Cname")
                         .SetString("Cname", name)
                         .UniqueResult<SystemUrl>();
        }

        public bool GetByRel(string Rel)
        {
            var URL = Session.CreateQuery(@"select u from SystemUrl as u where u.UrlRel=:rel")
                         .SetString("rel", Rel)
                         .UniqueResult<SystemUrl>();
            if (URL == null)
            { return false; }
            else
            { return true; }
        }

    }
}
