﻿using System;
using friday.core.components;
namespace friday.core.services
{
    public interface IPermissionManager
    {
        void Check(friday.core.components.FunctionTag functionTag, string userId, friday.core.components.PermissionTag type = PermissionTag.Enable);
        bool HasRight(friday.core.components.FunctionTag functionTag, string userId, friday.core.components.PermissionTag type = PermissionTag.Enable);
        void RefreshRolePermission();
        void RefreshUserInRole();
    }
}
