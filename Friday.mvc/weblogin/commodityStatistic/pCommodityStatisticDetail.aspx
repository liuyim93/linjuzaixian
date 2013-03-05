<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pCommodityStatisticDetail.aspx.cs" Inherits="Friday.mvc.weblogin.commodityStatistic.pCommodityStatisticDetail" %>



<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>基本信息</span></a></li>
       
           
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
             <input type="hidden" id="Hidden1" size="30" runat="server" />
            <p>
                <label>
                    商品品名称：</label>
                <input type="text" id="CommodityName" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    所属商店：</label>
                <input type="text" id="ShopName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    年：</label>
                <input type="text" id="Year" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    月：</label>
                <input type="text" id="Month" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    日：</label>
                <input type="text" id="Day" size="30" class="required textInput gray" runat="server" />
            </p>
               <p>
                <label>
                    销量：</label>
                <input type="text" id="Amount" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    评价次数：</label>
                <input type="text" id="ValuingCount" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    评分均值：</label>
                <input type="text" id="AverageValuing" size="30" class="required textInput gray" runat="server" />
            </p>
          
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
            o.find("#Content").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


        });


    });
</script>
