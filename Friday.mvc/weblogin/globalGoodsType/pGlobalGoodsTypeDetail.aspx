<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pGlobalGoodsTypeDetail.aspx.cs" Inherits="Friday.mvc.weblogin.globalGoodsType.pGlobalGoodsTypeDetail" %>

<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>商品类型信息</span></a></li>
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">

         <div>
                <p>
                <label>
                    商品类型：</label>
                <input type="text" id="GoodsType" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
            <p>
                <label>
                    商铺类型：</label>
                <select id="MerchantType" runat="server">
                    <option value="">请选择</option>
                    <option value="餐馆">餐馆</option>
                    <option value="租房">租房</option>
                    <option value="百货">百货</option>
                </select>
            </p>
         </div>

    </div>
    <div class="tabsFooter">
        <div class="tabsFooterContent">
        </div>
    </div>
</div>

