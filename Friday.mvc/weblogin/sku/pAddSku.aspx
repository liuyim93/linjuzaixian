<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddSku.aspx.cs" Inherits="Friday.mvc.weblogin.sku.pAddSku" %>

<div class="pageFormContent" layouth="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data"    runat="server">
    <input type="hidden" name="rel_hook" value='<%=Request.Params["rel_hook"]%>' />
    <div class="panel collapse" defh="155">
        <h1>
            商品规格</h1>
        <div>
            <input type="hidden" id="SkuId" size="30" runat="server" />

            <a href='skuProp/pSkuPropList.aspx?sku_id=<%=SkuId.Value %>&commodity_id=<%=Request.Params["commodity_id"] %>' prefix='<%=Request.Params["prefix"] %>'  rel_v3="jbsxBox2" target="ajax" style="display:none">load</a>
            <div id="jbsxBox2" class="pageFormContent" style="">
            </div>

        </div>
    </div>
   <div class="panel collapse" defh="95">
        <h1>
            基本信息</h1>
        <div>
            <p>
                <label>
                    商品价格：</label>
                <input type="text" id="price" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    库存数量：</label>
                <input type="text" id="stock" size="30" class="required textInput gray" runat="server" />
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
    <div class="divider">
    </div>
</div>
<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            o.find("a[rel_v3]").trigger("click");
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
