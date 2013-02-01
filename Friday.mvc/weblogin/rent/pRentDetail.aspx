<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pRentDetail.aspx.cs" Inherits="Friday.mvc.weblogin.rent.pRentDetail" %>


<div class="page">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>租房详情</span>
           </a></li>
           
        </ul>
    </div>
        <div class="pageFormContent" style="">
         
            <h1>
                租房基本信息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
                <p>
                <label>
                    联系人：</label>
                <input type="text" id="Owener" size="30" class="required textInput gray" runat="server" />
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
           
        </div>
    </div>
</div>
