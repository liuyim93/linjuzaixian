<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PictureUpload.aspx.cs" Inherits="Friday.mvc.weblogin.PictureUpload" %>
<div class="page">
    <div class="pageContent">
          
        <form id="Form1" method="post" runat="server" enctype="multipart/form-data" class="pageForm required-validate" onsubmit="return iframeCallback(this,PictureUpload_Callback);">
        <asp:textbox id="ID" runat="server" style="display: none;" ></asp:textbox>
        <div class="pageFormContent" layouth="56">
            <p>
                <label>
                    图片上传：</label>
                <input name="file1" id="file1" type="file" class="required textInput gray" runat="server"/>
                <input type="hidden" id="type1" runat="server" />
            </p>
                        <p style="color:red">
                请上传大小为100×120的相片(支持格式：.jpg/.jpeg/.png/.gif/.bmp)
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
 <script type="text/javascript">

//     $(document).ready(function () {
//         gpage.config({ "IsDialog": true });
//         gpage.init();
//     });

     function PictureUpload_Callback(json) {

         alert(json.path);

         var path = json.path;
//         gpage.jObj("NewsPic", null, null).attr("src", path);
         $("Image", null, null).val(path);
         $.pdialog.closeCurrent();
     }

</script>