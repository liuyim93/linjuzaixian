﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pValuingOfMyCommodityOrderDetail.aspx.cs" Inherits="Friday.mvc.weblogin.valuingOfMyCommodityOrder.pValuingOfMyCommodityOrderDetail" %>

<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>订单基本信息</span></a></li>
                <li class="selected"><a href="#"><span>订单配送信息</span></a></li>
                <li><a href='orderOfCommodity/pOrderOfCommodityList.aspx?myCommodityOrder_id=<%= Request.Params["MyCommodityOrderId"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox1"
                target="ajax"><span>订单明细</span></a></li>
                <li><a href='scoreOfItemInCommodityOrder/pScoreOfItemInCommodityOrderList.aspx?valuingOfMyCommodityOrder_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBoxScoreOfItem"
                target="ajax"><span>评价项评分管理</span></a></li>
                <li><a href='valuingComments/pValuingCommentsList.aspx?valuing_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBoxValuingComments"
                target="ajax"><span>评论回复管理</span></a></li>
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
                <p>
                <label>
                    订单编号：</label>
                <input type="text" id="OrderNumber" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    下单时间：</label>
                <input type="text" id="CreateTime" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    价格：</label>
                <input type="text" id="Price" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    订单用户：</label>
                <input type="text" id="LoginName" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    商铺名称：</label>
                <input type="text" id="Name" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
            <p>
                <label>
                    订单状态：</label>
                <select name="OrderStatus" id="OrderStatus" runat="server">
                <option value="">请选择</option>
                <option value="配送中">配送中</option>
                <option value="成功">成功</option>
                <option value="失败">失败</option>
                </select>
            </p>
         </div>
         
         <div>
            <p>
                <label>
                    联系人：</label>
                <input type="text" id="Linkman" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    联系电话：</label>
                <input type="text" id="Tel" size="30" class="required  textInput gray phone" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    备用电话：</label>
                <input type="text" id="BackupTel" size="30" class="required  textInput gray phone" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    配送地址：</label>
                <input type="text" id="Address" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
            <p>
                <label>
                    送货时间：</label>
                <input type="text" id="SendTime" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
         </div>
        
        <div id="jbsxBox1" >
        </div>
        <div id="jbsxBoxScoreOfItem" >
        </div>
        <div id="jbsxBoxValuingComments" >
        </div>
    </div>
    <div class="tabsFooter">
        <div class="tabsFooterContent">
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        var $self = $.self(page_prefix);
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {
            //o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });

        });
    });
</script>
