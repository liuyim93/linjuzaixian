using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class SystemButton : Entity
    {
        public SystemButton(string Id,int ColIndex, string ButtonShowName, string ButtonName, Boolean CloseType, string ButtonRoute)
        {
            this.Id = Id;
            this.ColIndex = ColIndex;
            this.ButtonShowName = ButtonShowName;
            this.ButtonName = ButtonName;
            this.CloseType = CloseType;
            this.ButtonRoute = ButtonRoute;
        
        }
        public SystemButton() { }
        /// <summary>
        /// 按钮的顺序位数
        /// </summary>
        public virtual int ColIndex
        { get; set; }
        /// <summary>
        /// 按钮显示在页面上的名称
        /// </summary>
        public virtual string ButtonShowName
        { get; set; }
        /// <summary>
        /// 按钮在后台的ID
        /// </summary>
        public virtual string ButtonName
        { get; set; }
        /// <summary>
        /// 按钮所属类别
        /// </summary>
        public virtual SystemMenu Menu
        { get; set; }
        public virtual SystemUrl SystemUrl
        { get; set; }
        public virtual string ButtonRoute
        { get; set; }
        //12-26尹福青新增。按钮是打开一个Dialog还是一个NavTab
        public virtual Boolean CloseType
        { get; set; }

    }
}
