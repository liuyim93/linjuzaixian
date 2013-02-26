<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSystemFunctionObjectDetail.aspx.cs" Inherits="Friday.mvc.weblogin.pSystemFunctionObjectDetail" %>

   <form id="form" method="post"  class="pageForm required-validate" runat="server">
        <%--2013-02-17 basilwang we still need get rel_hook after postback--%>
        <input type="hidden" name="rel_hook" value='<%=Request.Params["rel_hook"]%>' />
        <div layoutH="80px" style="">
            <h1>
                菜品基本信息</h1>
            <input type="hidden" id="FoodId" size="30" runat="server" />
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
