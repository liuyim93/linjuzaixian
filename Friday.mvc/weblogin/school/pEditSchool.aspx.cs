﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditSchool : BasePage
    {
        private ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.公共商品类型维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                School category = iSchoolService.Load(Id.Value);
                BindingHelper.RequestToObject(category);
                category.TLevel = Convert.ToInt32(TLevel.Value);

                if (Leaff.SelectedIndex == 0)
                {
                    category.Leaf = true;
                }
                else
                {
                    category.Leaf = false;
                }

                iSchoolService.Update(category);
                AjaxResult result = new AjaxResult();
                result.statusCode = "200";
                result.message = "操作成功";
                result.navTabId = "#";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            else
            {
                string code = Request.Params["code"];
                School category = iSchoolService.Load(code);

                bool ISC = iSchoolService.IsHaveChild(category);

                if (category != null)
                {
                    BindingHelper.ObjectToControl(category, Page);
                    Leaff.Value = Convert.ToString(category.Leaf);
                    TLevel.Value = Convert.ToString(category.TLevel);
                }

            }

        }
    }
}
