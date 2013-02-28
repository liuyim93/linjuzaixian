using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.repositories
{
    public class SystemFunctionObjectInRoleRepository : Repository<SystemFunctionObjectInRole>, ISystemFunctionObjectInRoleRepository
    {
        public SystemFunctionObjectInRole Get(string SystemRoleId, string SystemFunctionObjectId)
        {
            var s = (from x in this.Session.Query<SystemFunctionObjectInRole>() select x).Where(o => o.SystemFunctionObject.Id == SystemFunctionObjectId && o.Role.Id == SystemRoleId && o.IsDelete == false).SingleOrDefault();
            return s;
        }

        
     
    }
}
