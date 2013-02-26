using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc.weblogin.roleMenu
{
    public partial class pAddMenuButton : System.Web.UI.Page
    {
        private ISystemMenuRepository categoryRepo = new SystemMenuRepository();
        private ISystemUrlRepository urlRepo = new SystemUrlRepository();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["flag"] == "save")
            {

                SystemMenu dic = new SystemMenu();
                BindingHelper.RequestToObject(dic);
                dic.TLevel = Convert.ToInt32(TLevel.Value);
                string UrlPath = MenuRoute.Value.ToLower();
                dic.MenuRoute = UrlPath;
                dic.ColIndex = Convert.ToInt32(ColIndex.Text);

                //张超 2011-08-17 判断网址是否存在
                if (UrlPath != "")
                {
                    SystemUrl url = urlRepo.GetByUrlPath(UrlPath);
                    if (url == null)
                    {
                        if (urlRepo.GetByRel(MenuRel.Text) == false)
                        {
                            SystemUrl SU = new SystemUrl();
                            SU.UrlPath = UrlPath;
                            SU.UrlName = this.Name.Text;
                            SU.UrlRel = MenuRel.Text;
                            urlRepo.SaveOrUpdate(SU);
                            dic.SystemUrl = SU;
                        }
                        else
                        {
                            AjaxResult result = new AjaxResult();
                            result.statusCode = "300";
                            result.errorCloseType = "dialog";
                            result.message = "您填写的菜单Rel已被使用！";
                            result.navTabId = "menubuttonmanage";
                            result.callbackType = "forward";
                            result.forwardUrl = "RolePowerManage/MenuButtonManage.aspx";
                            FormatJsonResult jsonResult = new FormatJsonResult();
                            jsonResult.Data = result;
                            Response.Write(jsonResult.FormatResult());
                            Response.End();
                            return;
                        }
                    }
                    else
                    {
                        dic.SystemUrl = url;
                    }
                }
                if (UrlPath == "")
                {
                    dic.Leaf = false;
                }
                else
                {
                    dic.Leaf = true;
                }
                categoryRepo.SaveOrUpdate(dic);

                AjaxResult result1 = new AjaxResult();
                result1.statusCode = "200";
                result1.message = "操作成功";
                result1.navTabId = "menubuttonmanage";
                result1.callbackType = "closeCurrent";
                result1.forwardUrl = "RolePowerManage/MenuButtonManage.aspx";
                FormatJsonResult jsonResult1 = new FormatJsonResult();
                jsonResult1.Data = result1;
                Response.Write(jsonResult1.FormatResult());
                Response.End();

            }

            else if (Request["code"] != "" && Request["code"] != null)
            {
                string code = Request["code"];
                SystemMenu category = categoryRepo.GetSystemMenuByMenuID(code);

                if (category.Leaf == false)
                {
                    ParentID.Value = code;
                    TLevel.Value = Convert.ToString(category.TLevel + 1);
                    ///TODO 2011-08-05
                    TreeCode.Text = categoryRepo.GetCodeByParentCode(code);
                    ColIndex.Text = categoryRepo.GetColIndexByParentCode(code);
                }
                else
                {
                    AjaxResult result = new AjaxResult();
                    result.statusCode = "300";
                    result.errorCloseType = "dialog";
                    result.message = "您选择的父节点不能为叶节点！";
                    result.navTabId = "menubuttonmanage";
                    result.callbackType = "forward";
                    result.forwardUrl = "RolePowerManage/MenuButtonManage.aspx";
                    FormatJsonResult jsonResult = new FormatJsonResult();
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }
            }


        }
    }
}
