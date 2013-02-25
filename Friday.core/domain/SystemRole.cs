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
