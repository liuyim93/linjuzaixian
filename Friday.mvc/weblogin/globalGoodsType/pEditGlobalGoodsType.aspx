﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditGlobalGoodsType.aspx.cs" Inherits="Friday.mvc.weblogin.pEditGlobalGoodsType" %>

<div class="page">
    <div class="pageContent">
    <div class="panelBar">
    </div>
        <form id="form" method="post"  class="pageForm required-validate" 
        onsubmit="return validateCallback(this,navTabAjaxDone)" runat="server">
        <div class="pageFormContent" style="">
         
            <h1>
                商品类型信息</h1>
                <p>
                <label>
                    商品类型：</label>
                <input type="text" id="GoodsType" size="30" class="required textInput gray"  runat="server" />
            </p>
             <p>
                <label>
                    商铺类型：</label>
                    <select id="MerchantType" name="MerchantType" runat="server" >
                    <option value="餐馆" selected="selected">餐馆</option>
                    <option value="租房">租房</option>
                    <option value="百货">百货</option>
                    </select>
            </p>           
       
            <div class="formBar">
                <ul>
                    <li>
                        <div class="buttonActive">
                            <div class="buttonContent">
                                <button type="submit">
                                    保存</button>
                            </div>
                        </div>
                    </li>
                    <li></li>
                    <li>
                        <div class="buttonActive">
                            <div class="buttonContent">
                                <button type="reset" id="Clean">
                                    重置</button>
                            </div>
                        </div>
                    </li>
                    <li></li>
                </ul>
            </div>
        </div>
        </form>
    </div>
</div>