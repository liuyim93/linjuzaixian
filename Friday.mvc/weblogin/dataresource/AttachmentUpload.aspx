<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AttachmentUpload.aspx.cs" Inherits="Friday.mvc.weblogin.dataresource.AttachmentUpload" %>


<div class="page">
    <div class="pageContent" style=" height:350px;">
        <asp:placeholder id="NHibernate_Burrow_WebUtil_GlobalPlaceHolder" runat="server"></asp:placeholder>
        <form id="Form1" method="post" runat="server" enctype="multipart/form-data" action="AttachmentUpload.aspx?flag=save" onsubmit="return iframeCallbackAttach(this);" class="pageForm required-validate" >
        <asp:textbox id="ID" runat="server" style="display: none;" ></asp:textbox>
        <div class="pageFormContent" layouth="56">
            <p>
                <label>
                    附件上传：</label>
                <input name="file1" id="file1" type="file" class="required textInput gray" runat="server"/>
                <input type="hidden" id="type1" runat="server" />
            </p>
                        <p style="color:red">
            </p>
        </div>
        <div class="formBar">
            <ul>
                <li>
                    <ul>
                        <li>
                            <div class="buttonActive">
                                <div class="buttonContent">
                                    <button id="btnSave" type="submit">
                                        提交</button></div>
                            </div>
                        </li>
                        <li>
                          <div class="button">
                            <div class="buttonContent">
                              <button type="button" class="close">关闭</button>
                            </div>
                          </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        </form>
    </div>
</div>
<script   type="text/javascript">
$(function() {
    gpage.config({ "IsDialog": true });
    gpage.init();

    var x = function() {

        if (gpage.jObj("file1", null, "AttachmentUpload").val() != "") {

            var $form = $("form", navTab.getCurrentPanel());
            var data = $form.serializeArray();

            $.ajax({
                type: 'POST',
                url: "AttachmentUpload.aspx?flag=save",
                data: data,
                dataType: "json",
                cache: true,
                error: DWZ.ajaxError,
                success: function(json) {
                    var path = json.message;
                
                    gpage.jObj("AttachmentName", null, null).val(path);
                    $.pdialog.closeCurrent();
                    navTab.reloadFlagWithFormArray("AddNews");
                }
            });
            return false;
        }
        else { alertMsg.error("您还没有选择要上传的文件！") }
    };

  
});

</script>