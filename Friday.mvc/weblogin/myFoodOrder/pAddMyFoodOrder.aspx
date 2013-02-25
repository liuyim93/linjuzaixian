<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddMyFoodOrder.aspx.cs" Inherits="Friday.mvc.weblogin.myFoodOrder.pAddMyFoodOrder" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
    <div class="panel collapse" defh="95">
        <h1>
            订单详细信息</h1>
        <div>
            <p>
                <label>
                    订单编号：</label>
                <input type="text" id="OrderNumber" size="30" class="required textInput gray" runat="server" />
                <input type="hidden" id="Price" size="30" value="0" runat="server" />
            </p>
             <p>
                <label>
                    订单用户：</label>
                <input type="text" id="SystemUser" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="SystemUserID"  runat="server" />
                <a class="btnLook" href="ListSystemUser.aspx" rel="" lookupgroup="">选择用户</a>
            </p>
             <p>
                <label>
                    商铺名称：</label>
                <input type="text" id="Merchant" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="MerchantID"  runat="server" />
                <a class="btnLook" href="ListMerchantByMerchantType.aspx?MerchantType=餐馆" rel="" lookupgroup="">选择用户</a>
            </p>

            <p>
                <label>
                    订单状态：</label>
                <select name="OrderStatus" id="OrderStatus" runat="server">
                <option value="">请选择</option>
                <option value="配送中">配送中</option>
                <option value="成功">成功</option>
                <option value="失败">失败</option>
                </select>
            </p>
            <p>
                <label>
                    联系人：</label>
                <input type="text" id="Linkman" size="30" class="required  textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    联系电话：</label>
                <input type="text" id="Tel" size="30" class="required  textInput gray phone" runat="server" />
            </p>
             <p>
                <label>
                    备用电话：</label>
                <input type="text" id="BackupTel" size="30" class="required  textInput gray phone" runat="server" />
            </p>
             <p>
                <label>
                    配送地址：</label>
                <input type="text" id="Address" size="30" class="required  textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    配送时间：</label>
                <input type="text" id="SendTime" size="30" class="date  textInput gray" readonly="readonly" runat="server" />
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