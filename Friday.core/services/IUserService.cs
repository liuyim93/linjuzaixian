﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.services
{
    public interface IUserService
    {
        SystemUser getSystemUser(string id);
        void saveOrUpdateSystemUser(SystemUser user);
    }
}