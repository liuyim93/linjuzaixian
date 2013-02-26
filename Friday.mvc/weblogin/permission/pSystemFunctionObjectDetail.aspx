<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSystemFunctionObjectDetail.aspx.cs"
    Inherits="Friday.mvc.weblogin.pSystemFunctionObjectDetail" %>

<form id="form" method="post" class="pageForm required-validate" runat="server">
<div class="panel" defh="400" style="">
    <h1>
        功能点权限预览</h1>
    <div>
        <div id="panelEnabledState" runat="server">
            <p>
                <label>
                    启用权限状态：</label>
                <input type="checkbox" id="cbEnabledState" runat="server">
                是否启用</label>
            </p>
        </div>
        <div id="panelEditableState" runat="server">
            <p>
                <label>
                    编辑权限状态：</label>
                <input type="checkbox" id="cbEditableState" runat="server">
                是否编辑</label>
            </p>
        </div>
        <div id="panelDeletableState" runat="server">
            <p>
                <label>
                    删除权限状态：</label>
                <input type="checkbox" id="cbDeletableState" runat="server">
                是否删除</label>
            </p>
        </div>
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
</div>
</form>
