using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{

    public enum PremissionTag
    {
        Enable,
        Edit,
        Delete,
    }

    [System.AttributeUsage( System.AttributeTargets.Property  )]
    internal class PermissionSettingAttribute : System.Attribute
    {
        private FunctionTag tag = new FunctionTag();
        public PermissionSettingAttribute( params PremissionTag[] type )
        {
            foreach( var item in type )
            {
                switch( item )
                {
                    case PremissionTag.Enable:
                        tag.Enable = true;
                        break;
                    case PremissionTag.Edit:
                        tag.Edit = true;
                        break;
                    case PremissionTag.Delete:
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
