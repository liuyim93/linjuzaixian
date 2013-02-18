<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pRestaurantDetail.aspx.cs"
    Inherits="Friday.mvc.weblogin.restaurant.pRestaurantDetail" %>

<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>基本信息</span></a></li>
                <li><a href="#"><span>配送时间</span></a></li>
                <li><a href="#"><span>促销打折</span></a></li>
                <li><a href="#"><span>公告和Logo</span></a></li>
                <li><a href='Food/pFoodList.aspx?shop_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox1"
                target="ajax"><span>菜品</span></a></li>
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
             <input type="hidden" id="MyOrderId" size="30" runat="server" />
            <p>
                <label>
                    餐馆名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    简称：</label>
                <input type="text" id="ShortName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    店主：</label>
                <input type="text" id="Owener" size="30" class="required textInput gray" runat="server" />
            </p>
         </div>

         <div>
             <p>
                <label>
                    早餐配送时间：</label>
                <input type="text" id="MorningBeginHour" size="10" class="required textInput gray"
                    runat="server" />
                <label style="width: 10px">
                    —</label><input type="text" id="MorningEndHour" size="10" class="required textInput gray"
                        runat="server" />
            </p>
            <p>
                <label>
                    午餐配送时间：</label>
                <input type="text" id="AfternoonBeginHour" size="10" class="required textInput gray"
                    runat="server" /><label style="width: 10px">—</label><input type="text" id="AfternoonEndHour"
                        size="10" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    晚餐配送时间：</label>
                <input type="text" id="NightStartHour" size="10" class="required textInput gray"
                    runat="server" /><label style="width: 10px">—</label><input type="text" id="NightEndHour"
                        size="10" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    营业时间：</label>
                <input type="text" id="ShopHours" size="30" class="required textInput gray" runat="server" />
            </p>
         </div>

         <div>
          <p>
                <label>
                    距离：</label>
                <input type="text" id="Distance" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    折扣：</label>
                <input type="text" id="Rate" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    Tel：</label>
                <input type="text" id="Tel" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    Email：</label>
                <input type="text" id="Email" size="30" class="required email" runat="server" />
            </p>
            <p>
                <label>
                    地址：</label>
                <input type="text" id="Address" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    商铺当前状态：</label>
                <select id="ShopStatus" style="width: 85px" runat="server">
                    <option value="">请选择</option>
                    <option value="1">营业时间</option>
                    <option value="2">正在休息</option>
                </select>
            </p>
         </div>

         <div>
                     <div>
                <p>
                    <label>
                        商铺公告：</label>
                    <textarea class="editor" tools="simple" name="Bulletins" id="Bulletins" rows="15"
                        cols="42" runat="server"></textarea>
                </p>
            </div>
            <div>
                <p>
                    <label>
                        商铺活动：</label>
                    <textarea class="editor" name="Activity" id="Activity" rows="15" cols="42" runat="server"></textarea>
                </p>
            </div>
            <div style="clear: left; width: 80%; margin-top: 280px; margin-bottom: 60px;">
                <p>
                    <label>
                        详细内容：</label>
                    <div style="width: 100%;">
                        <textarea id="Description" name="Description" rows="20" cols="240" style="width: 100%"
                            runat="server"></textarea>
                    </div>
                </p>
            </div>
         </div>

        <div id="jbsxBox1" >
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
        $(document).one("panelloaded", function (e,o) {
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


        });


    });
</script>
