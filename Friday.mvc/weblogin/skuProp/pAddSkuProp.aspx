<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddSkuProp.aspx.cs" Inherits="Friday.mvc.weblogin.skuProp.pAddSkuProp" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
        <%--2013-02-17 basilwang we still need get rel_hook after postback--%>
        <input type="hidden" name="rel_hook" value='<%=Request.Params["rel_hook"]%>' />
        <div defh="95">
            <h1>配送地址基本信息</h1>
            <input type="hidden" id="SkuId" size="30" runat="server" />
            <p>
                <label>
                    规格类型：</label>
                <input type="text" id="PropIDName" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                <input type="hidden" id="PropID" size="30" runat="server" />
                <a class="btnLook" href="ListPropID.aspx" rel=""  lookupgroup="">选择规格</a>
            </p>

            <p>
                <label>
                    规格值：</label>
                <select id="PropValue" style="width: 85px" runat="server">
                    <option value="营业时间">营业时间</option>
                </select>
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
            debugger;

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