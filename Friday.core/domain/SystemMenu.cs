using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Iesi.Collections.Generic;

namespace friday.core
{
    public class SystemMenu : TreeNode
    {
        public SystemMenu(string id,string Name ,bool Leaf,string ParentID,int TLevel,string MenuImage,
              int ColIndex, string Remarks, string MenuRoute, bool IfiFrame)
        {
            this.Id = id;
            this.Name = Name;
            this.Leaf = Leaf;
            this.ParentID = ParentID;
            this.TLevel = TLevel;
            this.MenuImage = MenuImage;
            this.ColIndex = ColIndex;
            this.Remarks = Remarks;
            this.MenuRoute = MenuRoute;
            this.IfiFrame = IfiFrame;
        }
        public SystemMenu()
        { }
       /// <summary>
       /// 菜单路径
       /// </summary>
        public virtual string MenuRoute
        { get; set; }

        public virtual string MenuImage
        { get; set; }
        /// <summary>
        ///是否是IFrame页面 1:是，0：否
        /// </summary>
        public virtual bool IfiFrame
        { get; set; }
        /// <summary>
        /// 菜单rel
        /// </summary>

        public virtual string Remarks
        { get; set; }


        public virtual Iesi.Collections.Generic.ISet<RoleInMenu> RoleInMenus
        { get; set; }

        public virtual int ColIndex
        { get; set; }

       
    }
}
