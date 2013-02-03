﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface ISystemUserRepository : IRepository<SystemUser>
    {
        IList<SystemUser> GetSystemUsersByPageList(int start, int limit, out long total);
    }
}
