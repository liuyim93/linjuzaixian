<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditSystemRole.aspx.cs" Inherits="Friday.mvc.weblogin.pEditSystemRole" %>

<div class="page">
    <div class="pageContent">
        <form id="form" method="post"  class="pageForm required-validate" enctype="multipart/form-data" runat="server">
       
        <div class="pageFormContent" layoutH="80px" style="">
            <h1>
                角色基本信息</h1>
            <input type="hidden" id="FoodId" size="30" runat="server" />
             <p>
                <label>
                    角色名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    角色标注：</label>
                <input type="text" id="Remarks" size="30" class="required textInput gray" runat="server" />
            </p>        
           <p>
                <label>
                    备注：</label>
                <input type="text" id="Description" size="30" class="required textInput gray" runat="server" />
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
            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>