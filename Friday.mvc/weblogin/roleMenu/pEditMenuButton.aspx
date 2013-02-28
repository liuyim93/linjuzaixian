﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditMenuButton.aspx.cs" Inherits="Friday.mvc.weblogin.roleMenu.pEditMenuButton" %>

    <form id="form" method="post" onsubmit="return validateCallback(this,navTabAjaxDone);"
    class="pageForm required-validate" runat="server">
    <div class="panel" style="">
        <h1>修改界面</h1>
        <input name="Id" id="Id" type="hidden" runat="server"/>
        <input name="ParentID" id="ParentID" type="hidden" runat="server"/>
        <input name="TLevel" id="TLevel" type="hidden" runat="server"/>
        <div>
            <p>
                <label>
                    菜单名称：</label>
                <asp:textbox id="Name" runat="server" class="required textInput gray"></asp:textbox>
            </p>
            <p>
                <label>
                    菜单路径：</label>
                <input type="text" id="MenuRoute" name="MenuRoute" runat="server" class="textInput gray"></asp:textbox>
            
            </p>
            <p>
                <label>
                    菜单顺序：</label>
                <asp:textbox id="ColIndex" runat="server" class="required textInput gray digits" min="1"></asp:textbox>
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
                        <button type="reset" id="Button1">
                            重置</button>
                    </div>
                </div>
            </li>
            <li></li>
        </ul>
    </div>
    </div>
</div>
</form>


<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {

            var target_type = $.get_target_type(prefix);
            if (/navtab/i.test(target_type)) {
                o.find("#form").bind("submit", function (e) {
                    return iframeCallback(this, navTabAjaxDone)

                });
            }
            else {
                o.find("#form").bind("submit", function (e) {
                    return iframeCallback(this, dialogAjaxDone)

                });
            }
            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>