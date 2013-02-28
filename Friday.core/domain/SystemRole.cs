using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;
using friday.core.domain;

namespace friday.core
{
    public class SystemRole : Entity
    {
         public SystemRole()
        {
            RoleInMenus = new Iesi.Collections.Generic.HashedSet<RoleInMenu>();
            UserInRoles = new Iesi.Collections.Generic.HashedSet<UserInRole>();
        }

         public SystemRole(string id)
             : this()
        {
            this.Id = id;
        }
        public virtual  string RoleID
        {
            get;

            set;

        }
        /// <summary>
        /// 节点名称
        /// </summary>
        public virtual string Name
        {
            get;
            set;
        }

        public virtual  string Remarks
        {
            get;

            set;

        }
        public virtual string Description
        {
            get;

            set;

        }
        public virtual Iesi.Collections.Generic.ISet<RoleInMenu> RoleInMenus
        {
            get;

            set;

        }
        public virtual Iesi.Collections.Generic.ISet<UserInRole> UserInRoles
        {
            get;
            set;
        }
        #region 显示用，不做映射  
        /// <summary>
        /// 节点值
        /// </summary>
        public virtual string TreeCode
        {
            get;
            set;
        }
        /// <summary>
        /// 节点值
        /// </summary>
        public virtual string CompanyCode
        {
            get;
            set;
        }
        #endregion
    }
}
