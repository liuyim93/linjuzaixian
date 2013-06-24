<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddAddress.aspx.cs" Inherits="Friday.mvc.weblogin.pAddAddress" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
        <%--2013-02-17 basilwang we still need get rel_hook after postback--%>
        <input type="hidden" name="rel_hook" value='<%=Request.Params["rel_hook"]%>' />
        <div defh="95">
            <h1>
                配送地址基本信息</h1>
             <p>
                <label>
                    配送地址：</label>
                <input type="text" id="AddressName" size="30" class="required textInput gray" runat="server" />
            </p>

                <p>
            <label>
                 固定电话:</label>
            <input type="text" id="Tel" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    移动电话：</label>
                <input type="text" id="BackupTel" size="30" class="required textInput gray" runat="server" />
            </p>          
            <p>
                <label>
                    联系人：</label>
                <input type="text" id="Linkman" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    Email：</label>
                <input type="text" id="Email" size="30" class="required textInput email" runat="server" />
            </p>
            <p>
                <label>
                    微信：</label>
                <input type="text" id="Weixin" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    QQ：</label>
                <input type="text" id="QQ" size="30" class="required textInput gray" runat="server" />
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
    </form>
</div>
<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            //debugger;

            var target_type = $.get_target_type(prefix);
            if (/navtab/i.test(target_type)) {
                o.find("#form").bind("submit", function (e) {
                    return validateCallback(this, navTabAjaxDone)

                });
            }
            else {
                o.find("#form").bind("submit", function (e) {
                    return validateCallback(this, dialogAjaxDone)

                });
            }
            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>