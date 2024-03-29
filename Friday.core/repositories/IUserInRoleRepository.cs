﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface IUserInRoleRepository : IRepository<UserInRole>
    {
        string[] GetRoleNamesAndIDByLoginUserID(string userID);
        void DeleteUserInRoleByLoginUserID(string LID);
        void UnDeleteUserInRoleByLoginUserID(string MID);
    }
}
