using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate.Linq;
using friday.core.domain;

namespace friday.core.repositories
{
    public class SystemFunctionObjectInRoleRepository : Repository<SystemFunctionObjectInRole>, ISystemFunctionObjectInRoleRepository
    {
        public SystemFunctionObjectInRole Get(string SystemRoleId, string SystemFunctionObjectId)
        {
            var s = (from x in this.Session.Query<SystemFunctionObjectInRole>() select x).Where(o => o.SystemFunctionObject.Id == SystemFunctionObjectId && o.Role.Id==SystemRoleId).SingleOrDefault();
            return s;
        }
     
    }
}
