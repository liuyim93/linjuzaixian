using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{

    public enum PermissionTag
    {
        Enable,
        Edit,
        Delete,
    }

    [System.AttributeUsage( System.AttributeTargets.Property  )]
    internal class PermissionSettingAttribute : System.Attribute
    {
        private FunctionTag tag = new FunctionTag();
        public PermissionSettingAttribute( params PermissionTag[] type )
        {
            foreach( var item in type )
            {
                switch( item )
                {
                    case PermissionTag.Enable:
                        tag.Enable = true;
                        break;
                    case PermissionTag.Edit:
                        tag.Edit = true;
                        break;
                    case PermissionTag.Delete:
                        tag.Delete = true;
                        break;
                    default:
                        break;
                }
            }
        }
        public FunctionTag Tag
        {
            get { return tag; }
        }

    }

}
