using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin.shop
{
    public partial class nShopUpdate : System.Web.UI.Page
    {
        IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
        private Shop shop;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            shop = iShopRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                //SaveShop();
            }
            else
            {

                BindingHelper.ObjectToControl(shop, this);

            }
        }

        //private void SaveMyOrder()
        //{

        //    BindingHelper.RequestToObject(myOrder);
        //    string status = null;
        //    if (配送中.Checked)
        //    {
        //        status = 配送中.Value;
        //    }
        //    else
        //    {
        //        if (成功.Checked)
        //        {
        //            status = 成功.Value;
        //        }
        //        else
        //            status = 失败.Value;
        //    }
        //    MyOrderStatusEnum OrderStatus = (MyOrderStatusEnum)Enum.Parse(typeof(MyOrderStatusEnum), status, true);
        //    string isDelete = delete.Value;
        //    myOrder.OrderStatus = OrderStatus;
        //    if (isDelete == "False")
        //    {
        //        myOrder.IsDelete = false;
        //    }
        //    else
        //    {
        //        myOrder.IsDelete = true;
        //    }

        //    myOrderRepository.SaveOrUpdate(myOrder);

        //    AjaxResult result = new AjaxResult();
        //    result.statusCode = "200";
        //    result.message = "修改成功";
        //    result.navTabId = "referer";
        //    result.callbackType = "closeCurrent";
        //    FormatJsonResult jsonResult = new FormatJsonResult();
        //    jsonResult.Data = result;
        //    Response.Write(jsonResult.FormatResult());
        //    Response.End();

        //    //            Response.Write(@"<script> var statusCode='200';
        //    //                            var message='操作成功';
        //    //                            var navTabId='referer';
        //    //                            var callbackType='closeCurrent';
        //    //                            var response = {statusCode:statusCode,
        //    //                                            message:message,
        //    //                                            navTabId:navTabId,
        //    //                                            callbackType:callbackType
        //    //                                            };
        //    //                            debugger
        //    //                            if(window.parent.donecallback) window.parent.donecallback(response);
        //    //                            </script>
        //    //                            ");
        //    //            Response.End();

        //}

    }
}