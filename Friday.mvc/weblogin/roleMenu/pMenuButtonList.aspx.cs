using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using System.Web.Services;
using friday.core;
using friday.core.repositories;

namespace Friday.mvc.weblogin.roleMenu
{
    public partial class pMenuButtonList : BasePage
    {
        IRepository<SystemMenu> m = new Repository<SystemMenu>();
        ISystemMenuRepository categoryRepo = new SystemMenuRepository();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {
                DeleteMenu();
            }
        }


        private void DeleteMenu()
        {
            string TreeId = categoryRepo.Get(Request.Params["code"]).Id;
            m.PhysicsDelete(TreeId);
            AjaxResult result = new AjaxResult();

            result.statusCode = "200";
            result.message = "操作成功";
            //result.navTabId = "MenuButtonManage";
            //result.callbackType = "forward";
            //result.forwardUrl = "RolePowerManage/MenuButtonManage.aspx";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();


        }

        [WebMethod]
        public static string GetSystemMenu(IList<nvl> nvls)
        {
            List<JsonTree> list = new List<JsonTree>();
            var nodeID = (from c in nvls where c.name == "id" select c.value).FirstOrDefault();

            list = GetMenuJsonTreeByParentID(nodeID == "0" ? null : nodeID);

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = list;
            return jsonResult.FormatResult();
        }

        private static List<JsonTree> GetMenuJsonTreeByParentID(string ParentID)
        {
            ISystemMenuRepository categoryRepo = new SystemMenuRepository();
            IList<SystemMenu> firstList = categoryRepo.GetChildrenFromParentID(ParentID);
            List<JsonTree> list = new List<JsonTree>();

            for (int i = 0; i < firstList.Count; i++)
            {
                JsonTree jt = new JsonTree();
                SystemMenu model = firstList[i];
                bool haveChild = categoryRepo.IsHaveChild(model);

                jt.id = model.Id;
                jt.text = model.Name;
                jt.value = model.ParentID;
                jt.isexpand = true;
                //jt.showcheck = true;
                //jt.checkstate = Convert.ToByte(checkState);
                jt.hasChildren = haveChild;
                jt.ChildNodes = GetMenuJsonTreeByParentID(model.Id);
                jt.complete = true;
                list.Add(jt);

            }
            return list;

        }
    }
}
