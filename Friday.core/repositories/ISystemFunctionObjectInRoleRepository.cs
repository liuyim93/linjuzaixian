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
    public interface ISystemFunctionObjectInRoleRepository : IRepository<SystemFunctionObjectInRole>
    {

        SystemFunctionObjectInRole Get(string SystemRoleId, string SystemFunctionObjectId);
        IList<SystemFunctionObjectInRole> Search(List<DataFilter> termList);
        IList<SystemFunctionObjectInRole> Search(List<DataFilter> termList, int start, int limit, out long total);
       
    }
}
