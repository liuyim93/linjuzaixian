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

namespace Friday.mvc.weblogin
{
    public partial class pPropValueList : BasePage
    {

        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        string merchantId;
        string merchantType;


        protected string propValueName;
        protected string propValueId;
        protected int intPropValueId;
        protected string propIDName;

        IPropValueService iPropValueService = UnityHelper.UnityToT<IPropValueService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            merchantType = Request.Params["merchantType"];

            //tagName = systemFunctionObjectService.基本信息模块.自定义商品类型维护.TagName;
            //this.PermissionCheck();

            if (Request.Params["flag"] == "alldelete")
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                //tagName = systemFunctionObjectService.基本信息模块.自定义商品类型维护.TagName;
                //if (!this.PermissionValidate(PermissionTag.Delete))
                //{
                //    result.statusCode = "300";
                //    result.message = "没有PropValue删除权限";
                //    jsonResult.Data = result;
                //    Response.Write(jsonResult.FormatResult());
                //    Response.End();
                //}

                DeletePropValue();

            }
            else
            {
                if (!this.CurrentUser.IsAdmin)
                {
                    merchantId = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
                }
                else
                {
                    if (Request.Form["merchant_id"] != null)
                    {
                        merchantId = Request.Form["merchant_id"];
                    }
                    else
                    {
                        merchantId = Request.Params["merchant_id"];
                    }
                    this.addPV.Visible = false;
                }
                numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;
                List<DataFilter> filterList = new List<DataFilter>();
                List<DataFilter> filterMerchantList = new List<DataFilter>();
                List<DataFilter> filterPropIdList = new List<DataFilter>(); 
     

                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                if (!string.IsNullOrEmpty(Request.Form["PropValueName"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "PropValueName",
                        value = propValueName = Request.Form["PropValueName"]

                    });

                if (!string.IsNullOrEmpty(Request.Form["PropValueId"]))
                {
                    propValueId = Request.Form["PropValueId"];
                    filterList.Add(new DataFilter()
                       {
                           type = "Id",
                           value = propValueId
                       });
                }
                if (!string.IsNullOrEmpty(Request.Form["PropIDName"]))
                {
                    propIDName = Request.Form["PropIDName"];
                    filterPropIdList.Add(new DataFilter()
                    {
                        type = "PropIDName",
                        value = propIDName
                    });
                    filterList.Add(new DataFilter()
                    {
                        type = "PropID",
                        field = filterPropIdList
                    });
                }

                if (!string.IsNullOrEmpty(merchantId))
                {
                    filterMerchantList.Add(new DataFilter()
                    {
                        type = "Merchant",
                        value = merchantId
                    });
                    filterList.Add(new DataFilter()
                    {
                        type = "Merchant",
                        field = filterMerchantList
                    });
                }

                IList<PropValue> propValueList = iPropValueService.Search(filterList, start, limit, out total);

                repeater.DataSource = propValueList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeletePropValue()
        {
            int intid = Convert.ToInt32(Request.Params["uid"]);
            iPropValueService.Delete(intid);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "删除成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}