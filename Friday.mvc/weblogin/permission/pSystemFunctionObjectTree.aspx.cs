using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core;
using friday.core.repositories;
using System.Web.Services;
using System.Web.Script.Services;

namespace Friday.mvc.weblogin
{
    [ScriptService]
    public partial class pSystemFunctionObjectTree : System.Web.UI.Page
    {
        private static ISystemFunctionObjectRepository iSystemFunctionObjectRepository = UnityHelper.UnityToT<ISystemFunctionObjectRepository>();
        protected void Page_Load(object sender, EventArgs e)
        {
        }
        [WebMethod]
        public static  string list(IList<nvl> nvls)
        {
            List<JsonTree> list = new List<JsonTree>();
            var nodeID = (from c in nvls where c.name == "id" select c.value).FirstOrDefault();

            list = GetMenuJsonTreeByParentID(nodeID=="0"?null:nodeID);

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = list;
            return jsonResult.FormatResult();
        }
        private static  List<JsonTree> GetMenuJsonTreeByParentID(string ParentID)
        {
            IList<SystemFunctionObject> firstList = iSystemFunctionObjectRepository.GetChildrenFromParentID(ParentID);
            List<JsonTree> list = new List<JsonTree>();
            for (int i = 0; i < firstList.Count; i++)
            {
                JsonTree jt = new JsonTree();
                SystemFunctionObject systemFunctionObject = firstList[i];
                ////2010-11-17尹福青新增
                //Boolean state = RoleInMenuRepository.GetRoleInMenuByMenuID(systemFunctionObject.ParentFunctionObjectId);
                Boolean haveChild = iSystemFunctionObjectRepository.IsHaveChild(systemFunctionObject);
                jt.id = systemFunctionObject.Id;
                jt.text = systemFunctionObject.FunctionObjectName;
                jt.value = systemFunctionObject.ParentFunctionObjectId;
                //jt.showcheck = true;
                //jt.checkstate = Convert.ToByte(state);
                jt.hasChildren = haveChild;
                //2013-02-26 basilwang if you want to lazy load, set isexpand false;
                jt.isexpand = true;
                //2013-02-26 basilwang if you want to lazy load ,you should write like this
                /*
                     jt.complete = false;
                   otherwise  you should write like this
                     jt.ChildNodes = GetMenuJsonTreeByParentID(systemFunctionObject.Id);
                     jt.complete = true;
                */
                jt.ChildNodes = GetMenuJsonTreeByParentID(systemFunctionObject.Id);
                jt.complete = true;
                list.Add(jt);

            }
            return list;

        }
    }
}