using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using friday.core.components;
using friday.core;
using friday.core.repositories;

namespace Friday.mvc.weblogin.permission
{
    public partial class pRoleInMenuPermission : BasePage
    {
        public static ISystemMenuRepository SystemMenuRepository = new SystemMenuRepository();
        public static IRoleInMenuRepository RoleInMenuRepository = new RoleInMenuRepository();
        public static ISystemRoleRepository iSystemRoleRepository = UnityHelper.UnityToT<ISystemRoleRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetMenuListForRole(IList<nvl> nvls)
        {
            List<JsonTree> list = new List<JsonTree>();
            var nodeID = (from c in nvls where c.name == "id" select c.value).FirstOrDefault();
            var rid = (from c in nvls where c.name == "rid" select c.value).FirstOrDefault();
            list = GetMenuJsonTreeByParentIDandRoleID(nodeID == "0" ? null : nodeID, rid);

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = list;
            return jsonResult.FormatResult();
        }

        private static List<JsonTree> GetMenuJsonTreeByParentIDandRoleID(string ParentID, string roleID)
        {
            IList<SystemMenu> firstList = SystemMenuRepository.GetChildrenFromParentID(ParentID);
            List<JsonTree> list = new List<JsonTree>();
            for (int i = 0; i < firstList.Count; i++)
            {
                JsonTree jt = new JsonTree();
                SystemMenu model = firstList[i];
                //2010-11-17尹福青新增
                Boolean state = RoleInMenuRepository.GetRoleInMenuByMenuIDandRoleID(model.Id, roleID);
                Boolean haveChild = SystemMenuRepository.IsHaveChild(model);
                jt.id = model.Id;
                jt.text = model.Name;
                jt.value = model.ParentID;
                jt.isexpand = true;
                jt.showcheck = true;
                jt.checkstate = Convert.ToByte(state);
                jt.hasChildren = haveChild;
                jt.ChildNodes = GetMenuJsonTreeByParentIDandRoleID(model.Id, roleID);
                jt.complete = true;
                list.Add(jt);

            }
            return list;

        }

        [WebMethod]
        public static void SaveRoleInMenu(string menuid, string roleid)
        {
            IList<RoleInMenu> roleinmenus = RoleInMenuRepository.GetSystemMenuPListByRoleID(roleid);

            foreach (RoleInMenu cr in roleinmenus)
            {
                RoleInMenuRepository.PhysicsDelete(cr.Id);
            }

            SystemRole role = iSystemRoleRepository.Get(roleid);
            string[] menulist = menuid.Split(',');

            for (int i = 0; i < menulist.Length; i++)
            {
                RoleInMenu cr = null;
                SystemMenu menu = SystemMenuRepository.Get(menulist[i]);

                cr = new RoleInMenu();
                cr.SystemMenu = menu;
                cr.SystemRole = role;
                cr.ButtonID = null;
                RoleInMenuRepository.SaveOrUpdate(cr);

            }
        }
    }
}