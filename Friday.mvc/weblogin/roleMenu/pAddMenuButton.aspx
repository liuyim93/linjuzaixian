<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddMenuButton.aspx.cs" Inherits="Friday.mvc.weblogin.roleMenu.pAddMenuButton" %>

<div class="page">
    <div class="pageContent">
        <form id="Form1" method="post" runat="server" action="RolePowerManage/AddMenu.aspx?flag=save"
        class="pageForm required-validate" onsubmit="return validateCallbackMB(this);">
        <div class="pageFormContent" layouth="56">
            <asp:textbox id="Id" runat="server" style="display: none;" visibla="false"></asp:textbox>
            <input name="ParentID" id="ParentID" type="hidden" runat="server"/>
            <input name="TLevel" id="TLevel" type="hidden" runat="server"/>
            <p>
                <label>
                    菜单名称：</label>
                <asp:textbox id="Name" runat="server" class="required textInput gray"></asp:textbox>
            </p>
            <p>
                <label>
                    菜单编号：</label>
                <asp:textbox id="TreeCode" readonly="true" runat="server"></asp:textbox>
            </p>
            <p>
                <label>
                    菜单路径：</label>
                <input type="text" id="MenuRoute" name="MenuRoute" runat="server"></asp:textbox>
                <input name="UrlID" id="UrlID" type="hidden" runat="server"/>
                
                <a href="RolePowerManage/SelectUrl.aspx" target="dialog" callback="function callback() {
                 var st = gpage.jObj('REL',null,'dlg_pageurl').val();
                 var ss = st.split('&');
			     gpage.jObj('MenuRoute','addmenu',null).val(ss[0]);
			     gpage.jObj('UrlID','addmenu',null).val(ss[1]);
			     gpage.jObj('MenuRel','addmenu',null).val(ss[2]);
			     if(ss[0] != '')
			     { gpage.jObj('Leaff','addmenu',null).val('true'); }
                 }" rel="dlg_pageurl"><span>选择</span></a>
            
            </p>
            <p>
                <label>
                    菜单Rel：</label>
                <asp:textbox id="MenuRel" runat="server"></asp:textbox>
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
                    <div class="buttonActive">
                        <div class="buttonContent">
                            <button type="button" id="Clean" onclick="">
                                重置</button></div>
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
