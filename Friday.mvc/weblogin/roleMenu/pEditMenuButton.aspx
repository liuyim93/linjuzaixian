<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditMenuButton.aspx.cs" Inherits="Friday.mvc.weblogin.roleMenu.pEditMenuButton" %>

<div class="page">
    <div class="pageContent">
        <form id="Form1" method="post" runat="server" action="RolePowerManage/EditMenu.aspx?flag=save"
        class="pageForm required-validate" onsubmit="return validateCallbackMB(this);">
        <div class="pageFormContent" layouth="56">
            <input name="Id" id="Id" type="hidden" runat="server"/>
            <input name="ParentID" id="ParentID" type="hidden" runat="server"/>
            <input name="TLevel" id="TLevel" type="hidden" runat="server"/>
            <p>
                <label>
                    菜单名称：</label>
                <asp:textbox id="Name" runat="server"></asp:textbox>
            </p>
            <p>
                <label>
                    菜单编号：</label>
                <asp:textbox id="TreeCode" readonly="true" runat="server"></asp:textbox>
            </p>
            <p>
                <label>
                    菜单路径：</label>
                <input type="text" id="MenuRoute" name="MenuRoute" runat="server" readonly="true"></asp:textbox>
                <input name="UrlID" id="UrlID" type="hidden" runat="server"/>
                
                <a href="RolePowerManage/SelectUrl.aspx" target="dialog" callback="function callback() {
                 var st = gpage.jObj('REL',null,'dlg_pageurl').val();
                 var ss = st.split('&');
			     gpage.jObj('MenuRoute','editmenu',null).val(ss[0]);
			     gpage.jObj('UrlID','editmenu',null).val(ss[1]);
			     gpage.jObj('MenuRel','editmenu',null).val(ss[2]);
			     if(ss[0] != '')
			     { gpage.jObj('Leaff','editmenu',null).val('true'); }
                 }" rel="dlg_pageurl" runat="server" id="choose"><span>选择</span></a>
            
            </p>
            <p>
                <label>
                    菜单Rel：</label>
                <asp:textbox id="MenuRel" runat="server" readonly="true"></asp:textbox>
            </p>
            <p>
                <label>
                    菜单顺序：</label>
                <asp:textbox id="ColIndex" runat="server" ></asp:textbox>
            </p>
            <p>
                <label>
                    菜单描述：</label>
                <asp:textbox id="Remarks" runat="server"></asp:textbox>
            </p>
            <p>
                <label>
                    是否是叶节点：</label>
                
                <select id="Leaff" style="width:85px" runat="server" >
					<option value="True">是</option>
					<option value="False" selected="true">否</option>
				</select>   
                    
            </p>
        </div>
        <div class="formBar">
            <ul>
                <li>
                    <div class="buttonActive">
                        <div class="buttonContent">
                            <button type="submit">
                                保存</button></div>
                    </div>
                </li>
                <li>
                    <div class="button">
                        <div class="buttonContent">
                            <button type="button" class="close">
                                取消</button></div>
                    </div>
                </li>
            </ul>
        </div>
        </form>
    </div>
</div>

