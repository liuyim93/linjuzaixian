<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="nSystemUserAdd.aspx.cs" Inherits="Friday.mvc.weblogin.nSystemUserAdd" %>

<div class="page">
    <div class="pageContent">
    <div class="panelBar">
    </div>
        <form id="form" method="post"  class="pageForm required-validate" 
        onsubmit="return validateCallback(this,navTabAjaxDone)" runat="server">
        <div class="pageFormContent" style="">
         
            <h1>
                顾客用户详细信息</h1>
                <p>
                <label>
                    登录名：</label>
                <input type="text" id="LoginName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    密码：</label>
                <input type="password" id="Password" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    真实姓名：</label>
                <input type="text" id="Name" size="30" class="required  textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    联系电话：</label>
                <input type="text" id="Tel" size="30" class="required  textInput gray phone" runat="server" />
            </p>
             <p>
                <label>
                    电子邮箱：</label>
                <input type="text" id="Email" size="30" class="required  textInput gray email" runat="server" />
            </p>
             <p>
                <label>
                    个性签名：</label>
                <input type="text" id="Description" size="30" class="required  textInput gray" runat="server" />
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