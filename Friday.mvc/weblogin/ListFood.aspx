<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ListFood.aspx.cs" Inherits="Friday.mvc.weblogin.ListFood" %>

<div class="page">
    <div class="pageContent">
        <form id="Form2" method="post" runat="server" class="pageForm required-validate">
        <div class="panelBar">
            <ul class="toolBar">
            </ul>
        </div>
        <table class="table" layouth="140">
            <asp:repeater id="repeater" runat="server">
                 <HeaderTemplate>
                 <thead>
                     <tr>
                       <th width="40">序号</th> 
					    <th width="200">商品名称</th> 
                        <th width="100">商品单价</th> 
                        <th width="40">选择</th> 
                      </tr>
                 </thead>
                 <tbody> 
                 </HeaderTemplate>
                 <ItemTemplate> 
                    <tr target="userid" rel="<%#Eval("Id")%>">
                     <td><%#Container.ItemIndex+1%></td>
					 <td><%#DataBinder.Eval(Container.DataItem, "Name")%></td>
					 <td><%#DataBinder.Eval(Container.DataItem, "Price")%></td>
                     <td>
					<a class="btnSelect" href=javascript:$.bringBack({FoodID:'<%#DataBinder.Eval(Container.DataItem,"Id")%>',Food:'<%#DataBinder.Eval(Container.DataItem,"Name")%>',OnePrice:'<%#DataBinder.Eval(Container.DataItem,"Price")%>'}) title="查找带回">选择</a>
				</td>				
			</tr>
                </ItemTemplate>
         </asp:repeater>
            </tbody>
        </table>
        <div class="formBar">
            <ul>
                <li>
                    <div class="buttonActive">
                        <div class="buttonContent">
                            <button id="btnSave" type="button">
                                保存</button></div>
                    </div>
                </li>
                <li>
                    <div class="button">
                        <div class="buttonContent">
                            <button class="close" value="关闭">
                                取消</button></div>
                    </div>
                </li>
            </ul>
        </div>
        </form>
    </div>
</div>
<script   type="text/javascript">
    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {
        });
    });
 </script>