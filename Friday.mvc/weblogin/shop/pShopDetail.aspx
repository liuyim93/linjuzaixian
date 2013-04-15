<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pShopDetail.aspx.cs" Inherits="Friday.mvc.weblogin.shop.pShopDetail" %>



<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>基本信息</span></a></li>
                 <li><a href="#"><span>服务的学校</span></a></li>
                <li><a href="#"><span>配送时间</span></a></li>
                <li><a href="#"><span>促销打折</span></a></li>
                <li><a href="#"><span>公告和Logo</span></a></li>
<%--                <li><a href='commodity/pCommodityList.aspx?shop_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox1"
                target="ajax"><span>商品</span></a></li>--%>
                 <li><a href='merchantEmployee/pMerchantEmployeeList.aspx?merchantType=Shop&merchant_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox2"
                target="ajax"><span>员工列表</span></a></li>
                 <li><a href='merchantGoodsType/pMerchantGoodsTypeList.aspx?merchantType=Shop&merchant_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox111"
                target="ajax"><span>商品类型管理</span></a></li>
                <li><a href='propID/pPropIDList.aspx?merchantType=Shop&merchant_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox222"
                target="ajax"><span>规格类型管理</span></a></li>
                <li><a href='propValue/pPropValueList.aspx?merchantType=Shop&merchant_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox333"
                target="ajax"><span>规格明细管理</span></a></li>
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
             <input type="hidden" id="MyOrderId" size="30" runat="server" />
            <p>
                <label>
                    商店名称：</label>
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
                    服务的学校：</label>
                <input type="text" id="SchoolOfMerchant" size="30"  
                    runat="server" readonly="true" />
                <a class="btnLook" href="ListSchool.aspx" rel=""  lookupgroup="">选择学校</a>
            </p>
            <p>
                <label>
                    仅演示，应隐藏ID</label>
                <input type="text" id="SchoolOfMerchantID"  size="30" 
                    runat="server" readonly="true" />
            </p> 
            <p>
                <label>
                    服务的学校(多选）：</label>
                <input type="text" id="NameSet" size="35"  
                    runat="server" readonly="true" />
                <a class="btnLook" href="MultiListSchool.aspx?IDSet={IDSet}&NameSet={NameSet}"  rel=""  lookupgroup="">选择学校</a>
            </p>
            <p>
                <label>
                    仅演示，应隐藏ID</label>
                <input type="text" id="IDSet" size="35"  
                    runat="server" readonly="true" />
            </p>

         </div>

         <div>
     
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
                    <option value="营业时间">营业时间</option>
                    <option value="正在休息">正在休息</option>
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

         <div id="jbsxBox2" >
        </div>
         <div id="jbsxBox111" >
        </div>
         <div id="jbsxBox222" >
        </div>
         <div id="jbsxBox333" >
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
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


        });


    });
</script>
