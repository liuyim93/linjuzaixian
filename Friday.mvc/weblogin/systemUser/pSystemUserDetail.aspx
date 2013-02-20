<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSystemUserDetail.aspx.cs" Inherits="Friday.mvc.weblogin.systemUser.pSystemUserDetail" %>

<div class="page">
    <div class="pageContent">
    <div class="panelBar">
    </div>
        <div class="pageFormContent" style="">
         
            <h1>
                顾客用户详细信息</h1>
                <p>
                <label>
                    登录名：</label>
                <input type="text" id="LoginName" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    真实姓名：</label>
                <input type="text" id="Name" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    联系电话：</label>
                <input type="text" id="Tel" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    电子邮箱：</label>
                <input type="text" id="Email" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    个性签名：</label>
                <input type="text" id="Description" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>

        </div>
    </div>
</div>
