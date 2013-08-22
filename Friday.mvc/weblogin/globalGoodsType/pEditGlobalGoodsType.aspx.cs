using System;
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
    public partial class pEditGlobalGoodsType : BasePage
    {
        private IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();
        private IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();
        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.公共商品类型维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                GlobalGoodsType category = iGlobalGoodsTypeService.Load(Id.Value);
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
                category.Description = Request.Params["MerchantID"];
                iGlobalGoodsTypeService.Update(category);
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
                GlobalGoodsType category = iGlobalGoodsTypeService.Load(code);

                bool ISC = iGlobalGoodsTypeService.IsHaveChild(category);
                if (category != null)
                {
                    try
                    {
                        if (!string.IsNullOrEmpty(category.Description))
                        {
                            friday.core.Merchant shop = iMerchantService.Load(category.Description);
                            Merchant.Value = shop.Name;
                            MerchantID.Value = shop.Id;
                        }
                    }
                    catch (Exception ex)
                    {
                        category.Description = null;
                        iGlobalGoodsTypeService.Update(category);
                    }

                    finally
                    {
                        BindingHelper.ObjectToControl(category, Page);
                        Leaff.Value = Convert.ToString(category.Leaf);
                        TLevel.Value = Convert.ToString(category.TLevel);
                    }
                }

            }

        }
    }
}
