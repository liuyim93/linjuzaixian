<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddValuingComments.aspx.cs" Inherits="Friday.mvc.weblogin.valuingComments.pAddValuingComments" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
        <%--2013-02-17 basilwang we still need get rel_hook after postback--%>
        <input type="hidden" name="rel_hook" value='<%=Request.Params["rel_hook"]%>' />
        <div defh="95">
            <h1>
                评论基本信息</h1>
            <p>
                <label>
                    用户名称：</label>
                <input type="text" id="LoginName" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
            </p>

            <p>
                <label>
                    商铺名称：</label>
                <input type="text" id="MerchantName" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
            </p>

            <p>
            <label>
                    方向:</label>
                <select id="DirectionSelect" class="required" runat="server">
                    <option value="">请选择</option>
                    <option value="0">用户到商家</option>
                    <option value="1">商家到用户</option>

                </select>
            </p>

            <p>
                <label>
                    顺序：</label>
                <input type="text" id="TrackIndex" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
            </p>

            <p>
                <label>
                    评论：</label>
                <input type="text" id="Comments" size="30" class="required textInput gray"
                    runat="server" />
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
                    return iframeCallback(this, navTabAjaxDone)

                });
            }
            else {
                o.find("#form").bind("submit", function (e) {
                    return iframeCallback(this, dialogAjaxDone)

                });
            }

            var onePrice = o.find("#OnePrice");
            var amount = o.find("#Amount");
            var price = o.find("#Price");


            o.find("#Amount").keyup(function (event) {
                if (onePrice.val() != null && onePrice.val() != "" && amount.val().isInteger()) {
                    price.val((parseFloat(onePrice.val()) * parseFloat(amount.val())).toString());
                }
                else {
                    price.val("");

                }
            });

            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>