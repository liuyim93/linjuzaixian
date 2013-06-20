using System;
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
    public partial class pPropIDList : BasePage
    {

        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        string merchantId;
        string merchantType;


        protected string propIDName;
        protected string propIDId;
        protected int intPropIDId;

        IPropIDService iPropIDService = UnityHelper.UnityToT<IPropIDService>();
        IPropValueService iPropValueService = UnityHelper.UnityToT<IPropValueService>();
        IList<PropValue> ppvl=new List<PropValue>();

        protected void Page_Load(object sender, EventArgs e)
        {
            //merchantType = Request.Params["merchantType"];

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
                //    result.message = "没有PropID删除权限";
                //    jsonResult.Data = result;
                //    Response.Write(jsonResult.FormatResult());
                //    Response.End();
                //}
               
                DeletePropID();

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
                    this.addPD.Visible = false;
                }
                numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;
                List<DataFilter> filterList = new List<DataFilter>();
                List<DataFilter> filterMerchantList = new List<DataFilter>();                     
               

                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                if (!string.IsNullOrEmpty(Request.Form["PropIDName"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "PropIDName",
                        value = propIDName = Request.Form["PropIDName"]

                    });

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
                if (!string.IsNullOrEmpty(Request.Form["PropIDId"]))
                {
                    propIDId = Request.Form["PropIDId"];
                    filterList.Add(new DataFilter()
                    {
                        type = "Id",
                        value = propIDId

                    });
                }

                IList<PropID> propIDList = iPropIDService.Search(filterList, start, limit, out total);

                repeater.DataSource = propIDList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeletePropID()//级联删除PropValue
        {
            int intid = Convert.ToInt32(Request.Params["uid"]);
            iPropIDService.Delete(intid);
            //级联删除PropValue
            ppvl = iPropValueService.GetPropValueListByPropID(intid);
            foreach (var p in ppvl)
            {
                iPropValueService.Delete(p.Id);
            }
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