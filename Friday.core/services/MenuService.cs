using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.repositories;


namespace friday.core.services
{
    public class MenuService:IMenuService
    {
        private readonly ISystemMenuRepository SystemMenuRepository;
        
        public MenuService(ISystemMenuRepository SystemMenuRepository)
        {
            this.SystemMenuRepository = SystemMenuRepository;
        }
        
        public string MenuList(string userid)
        {
            StringBuilder strDiv = new StringBuilder();
            //一级
            IList<SystemMenu> menuList = SystemMenuRepository.GetMenuByUserIDAndParentID(userid,null);
            if (menuList.Count > 0)
            {
                for (int i = 0; i < menuList.Count; i++)
                {
                    SystemMenu menu = menuList[i];
                    strDiv.Append("<div class='accordionHeader'><h2><span>Folder</span>");
                    strDiv.Append(menu.Name);
                    strDiv.Append("</h2></div>");
                    //二级
                    //if (SystemMenuRepository.IsHaveChildPermissions(userinfo.Id, companyinfo.Id, menu.TreeCode))
                    //改成判断是否是叶子节点，若不是叶子节点则继续读取下级菜单，若是叶子节点则提供链接 张臣 2011.11.28
                    if (!menu.Leaf )
                    {
                        strDiv.Append(SecondMenuList(userid,menu.Id));
                    }
                }
            }
            return strDiv.ToString();
        }
        //二级
        private string SecondMenuList(string userid,string parentid)
        {
            StringBuilder strDiv = new StringBuilder();
            IList<SystemMenu> menuList = SystemMenuRepository.GetMenuByUserIDAndParentID(userid, parentid);
            if (menuList.Count > 0)
            {
                strDiv.Append("<div class='accordionContent'><ul class='tree treeFolder'>");
                for (int i = 0; i < menuList.Count; i++)
                {
                    SystemMenu menu = menuList[i];
                    strDiv.Append("<li>");
                    //if (SystemMenuRepository.IsHaveChildPermissions(userid, companyid, menu.TreeCode))
                    //改成判断是否是叶子节点，若不是叶子节点则继续读取下级菜单，若是叶子节点则提供链接 张臣 2011.11.28
                    if (!menu.Leaf)
                    {
                        strDiv.Append("<a>" + menu.Name + "</a>");
                        strDiv.Append(NextMenuList(userid,menu.Id));
                    }
                    else
                    {
                        strDiv.Append("<a href='" + menu.MenuRoute + "' target='navTab' rel='' " + (menu.IfiFrame? "IFrame='true'" : "") + ">" + menu.Name + "</a>");
                    }
                    strDiv.Append("</li>");
                }
                strDiv.Append("</ul></div>");
            }
            return strDiv.ToString();
        }
        //二级之后
        private string NextMenuList(string userid,string parentid)
        {
            StringBuilder strDiv = new StringBuilder();
            IList<SystemMenu> menuList = SystemMenuRepository.GetMenuByUserIDAndParentID(userid, parentid);
            if (menuList.Count > 0)
            {
                for (int i = 0; i < menuList.Count; i++)
                {
                    SystemMenu menu = menuList[i];
                    strDiv.Append("<ul>");
                    //if (SystemMenuRepository.IsHaveChildPermissions(userid, companyid, menu.TreeCode))
                    //改成判断是否是叶子节点，若不是叶子节点则继续读取下级菜单，若是叶子节点则提供链接 张臣 2011.11.28
                    if (!menu.Leaf)
                    {
                        strDiv.Append("<li><a>" + menu.Name + "</a>");
                        strDiv.Append(NextMenuList(userid, menu.Id));
                        strDiv.Append("</li>");
                    }
                    else
                    {
                        strDiv.Append("<li>");
                        strDiv.Append("<a href='" + menu.MenuRoute + "' target='navTab' rel='' " + (menu.IfiFrame?"IFrame='true'" : "") + ">" + menu.Name + "</a>");
                        strDiv.Append("</li>");
                    }
                    strDiv.Append("</ul>");
                }
            }
            return strDiv.ToString();
        }
    }
}
