using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public partial class SystemFunctionObjectService
    {
        public 社区 社区模块 { get; set; }
        public 城管 城管模块 { get; set; }
    }
    public class 社区 : BaseModel
    {
        [PermissionSetting(PremissionTag.Edit, PremissionTag.Enable, PremissionTag.Delete)]
        public FunctionTag 社区维护 { get; set; }
        [PermissionSetting(PremissionTag.Edit, PremissionTag.Delete)]
        public FunctionTag 网格维护 { get; set; }
    }

    public class 城管 : BaseModel
    {
        [PermissionSetting(PremissionTag.Edit, PremissionTag.Enable, PremissionTag.Delete)]
        public FunctionTag 数据导入 { get; set; }
        [PermissionSetting(PremissionTag.Edit, PremissionTag.Delete)]
        public FunctionTag 业务受理 { get; set; }
    }
}
