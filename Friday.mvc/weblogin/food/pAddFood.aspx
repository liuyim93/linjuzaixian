<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddFood.aspx.cs" Inherits="Friday.mvc.weblogin.pAddFood" %>


<div class="page">
    <div class="pageContent">
        <form id="form" method="post"  class="pageForm required-validate" enctype="multipart/form-data" runat="server">
        <%--2013-02-17 basilwang we still need get rel_hook after postback--%>
        <input type="hidden" name="rel_hook" value='<%=Request.Params["rel_hook"]%>' />
        <div class="pageFormContent" layoutH="80px" style="">
            <h1>
                菜品基本信息</h1>
            <input type="hidden" id="FoodId" size="30" runat="server" />
             <p>
                <label>
                    菜品名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>

            <p>
            <label>
                    菜品类型：</label>
           <select name="GoodsType" id="GoodsType" runat="server">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          
            </select>
            </p>
                <p>
            <label>
                 自定义类型:</label>
            <input id="otherType" type="text" name="otherType" size="30" class="textInpt" runat="server" />
            </p>
            <p>
                <label>
                    单价：</label>
                <input type="text" id="Price" size="30" class="required number" runat="server" />
            </p>          
            <p>
                <label>
                    月售额：</label>
                <input type="text" id="MonthAmount" size="30" class="digits" runat="server" />
            </p>
             <p>
                <label>
                    删除标记：</label>
                <input type="text" id="IsDelete" size="30" class="" runat="server" />
            </p>
            <p>
                <label>
                    附件上传：</label>
                <input id="Logo" type="file" class="textInput gray" runat="server" />
            </p>
            <p style="color: red">
                请上传大小为190×142的食物图片(支持格式：.jpg/.jpeg/.png/.gif/.bmp)
            </p>
             <p style="margin-left:20px;height:40px">
                <img id="LogoPreview" runat="server" />
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
                                <button type="reset" id="Clean">
                                    重置</button>
                            </div>
                        </div>
                    </li>
                    <li></li>
                </ul>
            </div>
        </div>
        </form>
    </div>
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