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

namespace Friday.mvc.weblogin
{
    public partial class pAddGlobalGoodsType : BasePage
    {
        IRepository<GlobalGoodsType> iGlobalGoodsTypeRepository = UnityHelper.UnityToT<IRepository<GlobalGoodsType>>();

        private GlobalGoodsType globalGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveGlobalGoodsType();
            }
        }

        private void SaveGlobalGoodsType()
        {
            globalGoodsType = new GlobalGoodsType();
            BindingHelper.RequestToObject(globalGoodsType);
            iGlobalGoodsTypeRepository.SaveOrUpdate(globalGoodsType);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}