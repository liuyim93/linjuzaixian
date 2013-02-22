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

namespace Friday.mvc.weblogin
{
    public partial class pEditGlobalGoodsType : System.Web.UI.Page
    {
        IRepository<GlobalGoodsType> iGlobalGoodsTypeRepository = UnityHelper.UnityToT<IRepository<GlobalGoodsType>>();

        private GlobalGoodsType globalGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            globalGoodsType = iGlobalGoodsTypeRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveGlobalGoodsType();
            }
            else
            {
                BindingHelper.ObjectToControl(globalGoodsType, this);
            }
        }

        private void SaveGlobalGoodsType()
        {

            BindingHelper.RequestToObject(globalGoodsType);
            iGlobalGoodsTypeRepository.SaveOrUpdate(globalGoodsType);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}