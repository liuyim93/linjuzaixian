<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="nSchoolDetail.aspx.cs" Inherits="Friday.mvc.weblogin.school.nSchoolDetail" %>

<div class="page">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>学校详细信息</span>
           </a></li>
           
        </ul>
    </div>
        <div class="pageFormContent" style=" height:250px;">
         
            <h1>
                学校信息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
                 <p>
                <label>
                    学校名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    简称：</label>
                <input type="text" id="ShortName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    所在城市：</label>
                <input type="text" id="CityName" size="30" class="required textInput gray" runat="server" />
            </p>
            
        </div>
    </div>
</div>
