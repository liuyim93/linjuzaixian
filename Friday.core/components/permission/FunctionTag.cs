using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace friday.core.components
{
    public class FunctionTag
    {
        public string ParentTag { get; set; }
        public bool Enable { get; set; }
        public bool Edit { get; set; }
        public bool Delete { get; set; }
        private string tagName;
        public string Name { get; set; }
        public string TagName
        {
            get
            {
                if( string.IsNullOrEmpty( ParentTag ) == false )
                {
                    return string.Format( "{0}.{1}", ParentTag, tagName );
                }
                else
                    return tagName;
            }
            set
            {
                tagName = value;
                this.Name = value;
            }
        }
    }

    


    

    public class 社区 : BaseModel
    {
        [PermissionSetting( PremissionTag.Edit, PremissionTag.Enable, PremissionTag.Delete )]
        public FunctionTag 社区维护 { get; set; }
        [PermissionSetting( PremissionTag.Edit, PremissionTag.Delete )]
        public FunctionTag 网格维护 { get; set; }
    }

    public class 城管 : BaseModel
    {
        [PermissionSetting( PremissionTag.Edit, PremissionTag.Enable, PremissionTag.Delete )]
        public FunctionTag 数据导入 { get; set; }
        [PermissionSetting( PremissionTag.Edit, PremissionTag.Delete )]
        public FunctionTag 业务受理 { get; set; }
    }


    public partial class FunctionObj
    {
        public 社区 社区模块 { get; set; }
        public 城管 城管模块 { get; set; }
    }

}
