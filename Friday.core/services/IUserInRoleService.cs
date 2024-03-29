﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IUserInRoleService
    {
        UserInRole Load(string id);
        void Save(UserInRole userInRole);
        void Update(UserInRole userInRole);
        void Delete(string id);
        string[] GetRoleNamesAndIDByLoginUserID(string userID);
        void DeleteUserInRoleByLoginUserID(string MID);
        void UnDeleteUserInRoleByLoginUserID(string MID);
       
    }
}
