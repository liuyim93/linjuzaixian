<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditValuingOfMyFoodOrder.aspx.cs" Inherits="Friday.mvc.weblogin.valuingOfMyFoodOrder.pEditValuingOfMyFoodOrder" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
    <div class="panel collapse" defh="95">
        <h1>
            订单评价详细信息</h1>
        <div>
             <p>
                <label>
                    订单编号：</label>
                <input type="text" id="OrderNumber" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="OrderID"  runat="server" />
                <a class="btnLook" href="ListMyFoodOrder.aspx" rel="" lookupgroup="">选择订单</a>
            </p>

            <p>
                <label>
                    订单价格：</label>
                <input type="text" id="Price" size="30" readonly="true" class="required  textInput gray" runat="server" />
            </p>

            <p>
                <label>
                    订单用户：</label>
                <input type="text" id="LoginName" size="30" readonly="true" class="required  textInput gray" runat="server" />
            </p>

            <p>
                <label>
                    商铺名称：</label>
                <input type="text" id="MerchantName" size="30" readonly="true" class="required  textInput gray" runat="server" />
            </p>

            <p>
                <label>
                    评价内容：</label>
                <input type="text" id="ValuingContent" size="30" class="required  textInput gray" runat="server" />
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