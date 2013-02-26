<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSystemFunctionObjectDetail.aspx.cs" Inherits="Friday.mvc.weblogin.pSystemFunctionObjectDetail" %>

        <div class="panel" defH="400" style="">
            <h1>
                功能点权限预览</h1>
            <div>
              <p>
                <label>
                    菜品名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    菜品当前价格：</label>
                <input type="text" id="Price" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    菜品过去价格：</label>
                <input type="text" id="OldPrice" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    库存量：</label>
                <input type="text" id="InventoryCount" size="30" class="required textInput gray" runat="server" />
            </p>
            </div>
           
         
        </div>
