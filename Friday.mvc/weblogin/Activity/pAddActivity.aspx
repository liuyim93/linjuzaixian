<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddActivity.aspx.cs" Inherits="Friday.mvc.weblogin.activity.pAddActivity"
    ValidateRequest="false" %>

<div class="page" style="">
    <div class="pageContent" layoutH="20">
        <div class="panelBar">
            <ul class="toolBar">
                <li><a class="add" href="OrderFoodList.aspx" target="dialog" rel=""><span>添加活动</span>
                </a></li>
            </ul>
        </div>
        <form id="form" method="post" class="pageForm required-validate" onsubmit="return iframeCallback(this,navTabAjaxDone)"
        enctype="multipart/form-data" runat="server">
        <div class="pageFormContent" >
            <h1>
                活动信息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
            <p>
                <label>
                    活动名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <%--  <p>
                <label>
                    活动事项：</label>
                <input type="text" id="Matters" size="30" class="required textInput gray" runat="server" />
            </p>--%>
            <p>
                <label>
                    活动事项：</label>
                <input type="text" id="GoodsType" size="25" class="required textInput gray" runat="server"
                    readonly="true" />
                <input type="hidden" id="GoodsTypeID" runat="server" />
                <a class="btnLook" href="ListGlobalGoodsType.aspx" rel="" lookupgroup="">选择类型</a>
            </p>
            <!--[if lte IE 7]><span style="clear:both;height:1px;width:100%;margin-top:-1px"></span><![endif]-->


            <script type="text/javascript">
                //本地预览
                function readImageURL(input) {
                debugger
                    var strSrc = $("#Image").val();
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $('#ImagePreview').attr('src', e.target.result);
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                }
            </script>

            <script type="text/javascript">
                //本地预览
                function readSubImageURL(input) {
                    debugger
                    var strSrc = $("#SubImage").val();
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $('#SubImagePreview').attr('src', e.target.result);
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                }
            </script>

            <p style="clear:left;height: 150px">
                <label>
                    幻灯图片上传：</label>
                <input id="Image" type="file" class="required textInput gray" runat="server" onchange="readImageURL(this);"/>

                <img id="ImagePreview" runat="server" style="margin:10px;width: 360px; height: 95px" />
                  <span style="color: red; width: 380px">&nbsp;&nbsp;&nbsp;&nbsp;请上传1600×420的幻灯图片(格式：.jpg/.jpeg/.png/.gif/.bmp)
                </span>
            </p>


            <p style="height: 150px">
                <label>
                    标题图片上传：</label>
                <input id="SubImage" type="file" class="required textInput gray" runat="server"  onchange="readSubImageURL(this);"/>

                <img  id="SubImagePreview" runat="server" style="margin:10px;width: 360px; height: 95px" />
                 <span style="color: red; width: 380px">&nbsp;&nbsp;&nbsp;&nbsp;请上传760×210的标题图片(格式：.png)
                </span>
            </p>
            <!--[if lte IE 7]><span style="clear:both;height:1px;width:100%;margin-top:-1px"></span><![endif]-->
            <p style="clear:left">
                    <label>
                        详细内容：</label>
                    <div style="width: 100%;">
                        <textarea id="Description" name="Description" rows="10" cols="240" style="width: 100%"
                            runat="server"></textarea>
                    </div>
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
</div>
<script type="text/javascript">
    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';
        $(document).one("panelloaded", function (e, o) {
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });

            o = null;

        });


    });
</script>
