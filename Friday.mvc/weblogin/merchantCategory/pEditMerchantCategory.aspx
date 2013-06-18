<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditMerchantCategory.aspx.cs" Inherits="Friday.mvc.weblogin.pEditMerchantCategory" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
    <div class="panel collapse" defh="95">
        <h1>
            商铺基本信息</h1>
        <div>
            <p>
                <label>
                    经营类型：</label>
                <input type="text" id="MerchantCategoryName" size="30" class="required textInput gray"  runat="server" />
            </p>
            <p>
                <label>
                    商铺类型：</label>
                <select id="MerchantType" class="required" runat="server">
                    <option value="">请选择</option>
                    <option value="餐馆">餐馆</option>
                    <option value="租房">租房</option>
                    <option value="百货">百货</option>
                </select>
            </p>
        </div>
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
                        <button type="reset" id="Button1">
                            重置</button>
                    </div>
                </div>
            </li>
            <li></li>
        </ul>
    </div>
    </form>
    <div class="divider"></div>
</div>
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