using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using System.Web.UI.HtmlControls;
using friday.core.domain;
using friday.core.EnumType;

namespace Friday.mvc.weblogin.message
{
    public partial class pMessageNotification : BasePage
    {
        protected IMessageRepository iMessageRepository = UnityHelper.UnityToT<IMessageRepository>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "readmsg")
            {
                string id=Request.Params["message_id"];
                readMessage(id);
            }
            else
            {
                if (!CurrentUser.IsAdmin)
                {
                    if (CurrentUser.SystemUser == null)
                    {
                        var shop = CurrentUser.LoginUserOfMerchants.FirstOrDefault().Merchant;
                        if (shop != null)
                        {
                            var list = iMessageRepository.GetNewMessageByShop(shop.Id);
                            repeater.DataSource = list;
                            repeater.DataBind();
                        }
                    }
                    else
                    {
                        popup.Visible = false;
                    }
                }
                else
                {
                    //2013-03-29 basilwang set popup invisible
                    popup.Visible = false;
                }
            }
        }

        protected void repeater_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            HtmlAnchor anchor = (HtmlAnchor)e.Item.FindControl("message_item");
            Message message = (Message)e.Item.DataItem;
            string url = string.Empty;
            url = "myCommodityOrder/pMyCommodityOrderList.aspx";
            //url = "OrderFood/pMyOrderDetail.aspx?uid={0}&discriminer={1}";
            //switch (message.MessageType.ToString())
            //{
            //    case "新订单":

            //        url = "OrderFood/pMyOrderDetail.aspx?uid={0}&discriminer={1}";
            //        break;
            //    case "新订单评价":

            //        url = "Food/pFoodDetail.aspx?uid={0}&discriminer={1}";
            //        break;

            //}
            anchor.HRef = string.Format(url, message.Id, message.Id);
            anchor.Name = message.Id;


        }

        private JsonNetResult readMessage(string messageID)
        {

            bool isSuccess;
            try
            {

                Message message = iMessageRepository.Get(messageID);
                if (message.IsNew)
                {

                    message.IsNew = false;

                    iMessageRepository.SaveOrUpdate(message);
                }

                isSuccess = true;
            }
            catch (Exception ex)
            {
                isSuccess = false;
            }

            return new JsonNetResult { Data = isSuccess };
        }
    }
}