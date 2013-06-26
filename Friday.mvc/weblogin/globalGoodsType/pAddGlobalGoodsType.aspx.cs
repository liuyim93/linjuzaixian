using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core;
using friday.core.repositories;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pAddGlobalGoodsType : BasePage
    {
        private IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.公共商品类型维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有GlobalGoodsType增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                GlobalGoodsType dic = new GlobalGoodsType();
                BindingHelper.RequestToObject(dic);
                dic.ParentID = (Request.Params["code"] == "" || Request.Params["code"] == null) ? null : Request.Params["code"];
                dic.TLevel = Convert.ToInt32(TLevel.Value);
                //2013-05-09 basilwang add family
                if (dic.ParentID == string.Empty||dic.ParentID ==null)
                {
                    dic.Family = "";
                }
                else
                {
                    GlobalGoodsType category = iGlobalGoodsTypeService.Load(dic.ParentID);
                    dic.Family = category.Family.Trim() + category.Id + ",";
                }
                if (Leaff.SelectedIndex == 0)
                {
                    dic.Leaf = true;
                }
                else
                {
                    dic.Leaf = false;
                }
                iGlobalGoodsTypeService.Save(dic);

                AjaxResult result1 = new AjaxResult();
                result1.statusCode = "200";
                result1.message = "操作成功";
                result1.navTabId = "referer";
                result1.callbackType = "closeCurrent";
                FormatJsonResult jsonResult1 = new FormatJsonResult();
                jsonResult1.Data = result1;
                Response.Write(jsonResult1.FormatResult());
                Response.End();

            }
            else
            {
                if (Request.Params["code"] == "" || Request.Params["code"] == null)
                {
                    TLevel.Value = Convert.ToString(0);

                }

                else
                {
                    string code = Request.Params["code"];
                    GlobalGoodsType category = iGlobalGoodsTypeService.Load(code);

                    if (category.Leaf == false)
                    {
                        TLevel.Value = Convert.ToString(category.TLevel + 1);
                    }
                    else
                    {
                        AjaxResult result = new AjaxResult();
                        result.statusCode = "300";
                        result.errorCloseType = "dialog";
                        result.message = "您选择的父节点不能为叶节点！";
                        result.callbackType = "closeCurrent";
                        FormatJsonResult jsonResult = new FormatJsonResult();
                        jsonResult.Data = result;
                        Response.Write(jsonResult.FormatResult());
                        Response.End();
                    }
                }
            }

        }
    }
}
