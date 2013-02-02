<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="nGlobalGoodsTypeDetail.aspx.cs" Inherits="Friday.mvc.weblogin.globalGoodsType.nGlobalGoodsTypeDetail" %>

<div class="page">
    <div class="pageContent">
    <div class="panelBar">
    </div>
        <div class="pageFormContent" style="">
         
            <h1>
                商品类型信息</h1>
                <p>
                <label>
                    商品类型：</label>
                <input type="text" id="GoodsType" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    商铺类型：</label>
                <input type="text" id="MerchantType" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
           
        </div>
    </div>
</div>
