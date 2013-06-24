<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pCommodityDetail.aspx.cs" Inherits="Friday.mvc.weblogin.sku.pCommodityDetail" %>

<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>商品基本信息</span></a></li>
                <li><a href='sku/pSkuList.aspx?commodity_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox1"
                target="ajax"><span>商品种类</span></a></li>
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
             <p>
                <label>
                    商品名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
           <%-- <p>
                <label>
                    库存量：</label>
                <input type="text" id="InventoryCount" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
           
            <p>
            <label>
                    上/下架：</label>
           <select name="IsEnabled" id="IsEnabled" runat="server">
            <option value="" ></option>
            <option value="True" >上架</option>
            <option value="False" >下架</option>
          
            </select>
            </p>
            <p>
            <label>
                    是否打折：</label>
           <select name="IsDiscount" id="IsDiscount" runat="server">
            <option value="" ></option>
            <option value="True" >是</option>
            <option value="False" >否</option>
          
            </select>
            </p>
            <p>
                <label>
                    折扣库存量：</label>
                <input type="text" id="DiscountInventoryCount" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
               --%>
               <p>
                <label>
                    商品类型：</label>
                <input type="text" id="GoodsType" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="GoodsTypeID"  runat="server" />
                <a class="btnLook" href="ListGlobalGoodsType.aspx" rel="" lookupgroup="">选择类型</a>
            </p>
            <p>
                <label>
                    月售额：</label>
                <input type="text" id="MonthAmount" size="30" class="digits" readonly="readonly" runat="server" />
            </p>
              <p>
                <label>
                    销售额：</label>
                <input type="text" id="Amount" size="30" class="digits" readonly="readonly" runat="server" />
              </p>
              <p style="height: 150px">
                <label>
                    标题图片上传：</label>
                
                <img  id="LogoPreview" runat="server" style="margin:10px;width: 360px; height: 95px" />
                <%-- <span style="color: red; width: 380px">&nbsp;&nbsp;&nbsp;&nbsp;请上传760×210的标题图片(格式：.png)
                </span>--%>
            </p>
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
        $(document).one("panelloaded", function (e, o) {
            //o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });
        });
    });
</script>
