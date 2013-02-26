using System;
using friday.core.components;
namespace friday.core.services
{
    public interface IPermissionManager
    {
        void Check(friday.core.components.FunctionTag functionTag, friday.core.components.PremissionTag type = PremissionTag.Enable);
        bool HasRight(friday.core.components.FunctionTag functionTag, friday.core.components.PremissionTag type = PremissionTag.Enable);
        void RefreshRolePermission();
        void RefreshUserInRole();
    }
}
