<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="nMerchantCategoryDetail.aspx.cs" Inherits="Friday.mvc.weblogin.merchantCategory.nMerchantCategoryDetail" %>

<div class="page">
    <div class="pageContent">
    <div class="panelBar">
    </div>
        <div class="pageFormContent" style="">
         
            <h1>
                商铺经营类型信息</h1>
                <p>
                <label>
                    经营类型：</label>
                <input type="text" id="MerchantCategoryName" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    商铺类型：</label>
                <input type="text" id="MerchantType" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
           
        </div>
    </div>
</div>
