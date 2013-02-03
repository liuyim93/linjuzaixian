<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="nShopDetail.aspx.cs" Inherits="Friday.mvc.weblogin.shop.nShopDetail" %>

<div class="page">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>订单详情</span>
           </a></li>
           
        </ul>
    </div>
        <div class="pageFormContent" style=" height:250px;">
         
            <h1>
                商铺基本信息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
             <p>
                <label>
                    商铺名称：</label>
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
                    营业时间：</label>
                <input type="text" id="ShopHours" size="30" class="required textInput gray" runat="server" />
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
                <select id="ShopStatus" style="width:85px" runat="server">
					<option value="">请选择</option>
				
					<option value="1">营业时间</option>
                    <option value="2">正在休息</option>
				</select> 
            </p>
          <p></p><p></p>
           <div>
            <p >
                 <label >商铺公告：</label>
					<textarea class="editor" tools="simple"  name="Bulletins" id="Bulletins" rows="15" cols="42" runat="server"></textarea>
           </p>
           </div>
           <div>
            <p >
                 <label >商铺活动：</label>
					<textarea   class="editor"    name="Activity" id="Activity" rows="15" cols="42"  runat="server"></textarea>
           </p>
           </div>        
         <div style=" clear:left; width:80%; margin-top:280px;margin-bottom:60px;" >
             <p>
                 <label>详细内容：</label>
             <div style="   width:100%; ">
				 	<textarea id="Description"    name="Description" rows="20" cols="240" style="width: 100%" runat="server"></textarea>
				</div>
                </p>
                  
       </div>
        </div>
    </div>
</div>
