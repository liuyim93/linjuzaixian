<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditSkuProp.aspx.cs" Inherits="Friday.mvc.weblogin.pEditSkuProp" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
        <%--2013-02-17 basilwang we still need get rel_hook after postback--%>
        <input type="hidden" name="rel_hook" value='<%=Request.Params["rel_hook"]%>' />
        <div defh="95">
            <h1>规格基本信息</h1>
            <input type="hidden" id="SkuId" size="30" runat="server" />
            <p>
                <label>
                    规格类型：</label>
                <input type="text" id="PropIDName" size="30" class="required textInput gray" runat="server" readonly="true" />
                <input type="hidden" id="PropID" size="30" runat="server" />
                <a class="btnLook" href="ListPropID.aspx" rel=""  lookupgroup="">选择规格</a>
            </p>

            <p>
                <label>
                    规格值：</label>
                <select id="PropValue" style="width: 85px" runat="server" class="required">
                       <option value="">请选择</option>
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

            var propID = o.find("#PropID");
            var PropValue = o.find("#PropValue");

            o.find("#PropID").change(function (event) {
                //debugger
                var dataStr = "{'nvls':[{'name':'propID','value':'" + propID.val() + "'}]}";
                $.ajax({
                    type: "POST",
                    contentType: 'application/json; charset=utf8',
                    dataType: "json",
                    data: dataStr,
                    url: "skuProp/pAddSkuProp.aspx/GetPropValue?t=" + (new Date().getTime()),
                    success: function (result) {
                        //debugger
                        if (result == null) return;
                        if (result.d != null) {
                            var items = eval(result.d);
                            PropValue.empty();
                            PropValue.append('<option value="">请选择</option>');
                            for (var i = 0; i < items.length; i++) {
                                PropValue.append('<option value="' + items[i].Id + '">' + items[i].PropValueName + '</option>');
                            }
                        }
                    }
                });
            });


            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;
        });
    });
</script>