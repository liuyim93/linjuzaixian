using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;
using friday.core.domain;


namespace friday.core
{
    public  class SystemUrl : Entity
    {

    
        public virtual string UrlPath
        { get; set; }
        public virtual string UrlName
        { get; set; }
        public virtual string UrlRel
        { get; set; }


        /// <summary>
        /// 对应多个月度预算明细
        /// 2010-12-4尹福青修改解决在保存时this.MonthFundsBudgetDetails=null的问题
        /// </summary>
        private Iesi.Collections.Generic.ISet<SystemButton> m_Details = null;
        public virtual Iesi.Collections.Generic.ISet<SystemButton> SystemButtons
        {
            get
            {
                if (this.m_Details == null)
                {
                    this.m_Details = new HashedSet<SystemButton>();
                }
                return this.m_Details;
            }
            set
            {

                this.m_Details = value;
            }
        }

        /// <summary>
        /// 对应多个月度预算明细
        /// 2010-12-4尹福青修改解决在保存时this.MonthFundsBudgetDetails=null的问题
        /// </summary>
        private Iesi.Collections.Generic.ISet<SystemMenu> m_Menus = null;
        public virtual Iesi.Collections.Generic.ISet<SystemMenu> SystemMenus
        {
            get
            {
                if (this.m_Menus == null)
                {
                    this.m_Menus = new HashedSet<SystemMenu>();
                }
                return this.m_Menus;
            }
            set
            {

                this.m_Menus = value;
            }
        }
        




 
      
    }
}
