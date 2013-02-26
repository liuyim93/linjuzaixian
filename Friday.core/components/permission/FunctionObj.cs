using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public partial class SystemFunctionObjectService
    {
        public 餐馆管理 餐馆管理模块 { get; set; }
        public 统计 统计模块 { get; set; }
    }
    public class 餐馆管理 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 餐馆维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Delete)]
        public FunctionTag 菜品维护 { get; set; }
    }

    public class 统计 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 数据导入 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Delete)]
        public FunctionTag 业务受理 { get; set; }
    }
}
