﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;
using friday.core.services;
using System.Web.Services;

namespace Friday.mvc.weblogin
{
    public partial class pSchoolList : BasePage
    {
        private ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.公共商品类型维护.TagName;
            this.PermissionCheck();
            //2013-02-28 basilwang you can use this to block button
            if (!this.PermissionValidate(PermissionTag.Delete))
            {
                //this.liDelete
                this.liDelete.Visible = false;
            }


            if (Request.Params["flag"] == "alldelete")
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.基本信息模块.公共商品类型维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有School删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteMenu();
            }
        }


        private void DeleteMenu()
        {
            string TreeId = iSchoolService.Load(Request.Params["code"]).Id;
            iSchoolService.Delete(TreeId);
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
        public static string GetSchool(IList<nvl> nvls)
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
            ISchoolRepository categoryRepo = new SchoolRepository();
            IList<School> firstList = categoryRepo.GetChildrenFromParentID(ParentID);
            List<JsonTree> list = new List<JsonTree>();

            for (int i = 0; i < firstList.Count; i++)
            {
                JsonTree jt = new JsonTree();
                School model = firstList[i];
                bool haveChild = categoryRepo.IsHaveChild(model);

                jt.id = model.Id;
                jt.text = model.Name;
                jt.value = model.ParentID;
                jt.isexpand = false;
                //jt.showcheck = true;
                //jt.checkstate = Convert.ToByte(checkState);
                jt.hasChildren = haveChild;
                jt.ChildNodes = GetMenuJsonTreeByParentID(model.Id);
                jt.complete = true;
                list.Add(jt);

            }
            return list;

        }

        [WebMethod]
        public static string MultiGetSchool(IList<nvl> nvls)
        {
            List<JsonTree> list = new List<JsonTree>();
            var nodeID = (from c in nvls where c.name == "id" select c.value).FirstOrDefault();

            list = MultiGetMenuJsonTreeByParentID(nodeID == "0" ? null : nodeID);

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = list;
            return jsonResult.FormatResult();
        }

        private static List<JsonTree> MultiGetMenuJsonTreeByParentID(string ParentID)
        {
            ISchoolRepository categoryRepo = new SchoolRepository();
            IList<School> firstList = categoryRepo.GetChildrenFromParentID(ParentID);
            List<JsonTree> list = new List<JsonTree>();

            for (int i = 0; i < firstList.Count; i++)
            {
                JsonTree jt = new JsonTree();
                School model = firstList[i];
                bool haveChild = categoryRepo.IsHaveChild(model);

                jt.id = model.Id;
                jt.text = model.Name;
                jt.value = model.ParentID;
                jt.isexpand = true;
                jt.showcheck = true;
                //jt.checkstate = Convert.ToByte(checkState);
                jt.hasChildren = haveChild;
                jt.ChildNodes = MultiGetMenuJsonTreeByParentID(model.Id);
                jt.complete = true;
                list.Add(jt);

            }
            return list;

        }

        [WebMethod]
        public static string RegisterGetSchool(IList<nvl> nvls)
        {
            List<JsonTree> list = new List<JsonTree>();
            var nodeID = (from c in nvls where c.name == "id" select c.value).FirstOrDefault();
            ISchoolRepository categoryRepo = new SchoolRepository();
            IList<School> firstList = categoryRepo.GetChildrenFromParentID(nodeID == "0" ? null : nodeID);

            for (int i = 0; i < firstList.Count; i++)
            {
                JsonTree jt = new JsonTree();
                School model = firstList[i];
                bool haveChild = categoryRepo.IsHaveChild(model);

                jt.id = model.Id;
                jt.text = model.Name;
                jt.value = model.ParentID;
                jt.isexpand = true;
                jt.showcheck = true;
                //jt.checkstate = Convert.ToByte(checkState);
                jt.hasChildren = haveChild;
                jt.complete = true;
                list.Add(jt);
            }

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = list;
            return jsonResult.FormatResult();
        }
    }
}
