﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="nRestaurantUpdate.aspx.cs" Inherits="Friday.mvc.weblogin.restaurant.nRestaurantUpdate" %>

<div class="page">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>餐馆详情</span>
           </a></li>
           
        </ul>
    </div>
        <form id="form" method="post"  class="pageForm required-validate" 
        onsubmit="return validateCallback(this,navTabAjaxDone)" runat="server">
        <div class="pageFormContent" style="">
         
            <h1>
                餐馆基本信息</h1>
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
            <p>
                <label>
                    早餐配送时间：</label>
                <input type="text" id="MorningBeginHour" size="10" class="required textInput gray" runat="server"   /> <label style=" width:10px">—</label><input type="text" id="MorningEndHour" size="10" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    午餐配送时间：</label>
               <input type="text" id="AfternoonBeginHour" size="10" class="required textInput gray" runat="server" /><label style=" width:10px">—</label><input type="text" id="AfternoonEndHour" size="10" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    晚餐配送时间：</label>
               <input type="text" id="NightStartHour" size="10" class="required textInput gray" runat="server" /><label style=" width:10px">—</label><input type="text" id="NightEndHour" size="10" class="required textInput gray" runat="server" />
              </p>
             <p>
                <label>
                    营业时间：</label>
                <input type="text" id="ShopHours" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    Tel：</label>
                <input type="text" id="Tel" size="30" class="required textInput gray" runat="server" />
            </p>

             <p>
                <label>
                    email：</label>
                <input type="text" id="Email" size="30" class="required email" runat="server" />
            </p>
             <p>
                <label>
                    地址：</label>
                <input type="text" id="Address" size="30" class=" textInput gray" runat="server" />
            </p>
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
            <p style="float:left; ">
                 <label style="float:left; ">商铺公告：</label>
					<textarea style="float:left; " name="Bulletins" id="Bulletins" rows="10" cols="42" tools="mini" runat="server"></textarea>
           </p>
          <p></p>
            <p >
                 <label>详细内容：</label>
                <div style="float:left; clear:left; width:80%;">
				     	<textarea id="Description" name="Description" rows="20" cols="120" style="width: 87%" runat="server"></textarea>
				</div>
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