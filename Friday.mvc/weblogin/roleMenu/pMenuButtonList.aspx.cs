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
    public partial class pMenuButtonList : System.Web.UI.Page
    {
        ISystemMenuRepository categoryRepo = new SystemMenuRepository();
        ISystemButtonRepository dicRepository = new SystemButtonRepository();
        ISystemUrlRepository urlRepo = new SystemUrlRepository();
        IRepository<SystemMenu> m = new Repository<SystemMenu>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {
                DeleteMenu();
            }
        }


        private void DeleteMenu()
        {
            string TreeId = categoryRepo.GetIDByTreeCode(Request.Params["code"]);
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
            ISystemMenuRepository categoryRepo = new SystemMenuRepository();
            var nodeID = (from c in nvls where c.name == "id" select c.value).FirstOrDefault();
            IList<SystemMenu> firstList = categoryRepo.GetChildrenFromParentID(nodeID);
            List<JsonTree> list = new List<JsonTree>();

            for (int i = 0; i < firstList.Count; i++)
            {
                JsonTree jt = new JsonTree();
                SystemMenu model = firstList[i];
                bool haveChild = categoryRepo.IsHaveChild(model);

                jt.id = model.TreeCode;
                jt.text = model.Name;
                jt.value = model.Leaf.ToString();
                //jt.showcheck = true;
                //jt.checkstate = Convert.ToByte(checkState);
                jt.hasChildren = haveChild;
                jt.complete = false;
                list.Add(jt);

            }

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = list;
            return jsonResult.FormatResult();
        }
    }
}
