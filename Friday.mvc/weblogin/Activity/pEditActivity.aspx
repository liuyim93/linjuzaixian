<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditActivity.aspx.cs" Inherits="Friday.mvc.weblogin.activity.pEditActivity" %>

<div class="page" style="">
    <div class="pageContent" layoutH="20">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>修改活动信息</span>
           </a></li>
           
        </ul>
    </div>
       <form id="form" method="post"  class="pageForm required-validate" 
        onsubmit="return iframeCallback(this,navTabAjaxDone)" enctype="multipart/form-data" runat="server" >
        <div class="pageFormContent" style=" height:300px">
         
            <h1>
                活动信息</h1>
          
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
                    活动类型：</label>
                <input type="text" id="GoodsType" size="25" class="required textInput gray" runat="server"
                    readonly="true" />
                <input type="hidden" id="GoodsTypeID" runat="server" />
                <a class="btnLook" href="ListGlobalGoodsType.aspx" rel="" lookupgroup="">选择类型</a>
            </p>
             <p>
                <label>
                    活动指定商家：</label>
                 <input type="text" id="Merchant"  name="Merchant" size="35" 
                        runat="server" readonly="true" />
                    <input type="hidden" id="MerchantID" name="MerchantID" size="35"   
                    runat="server" readonly="true" />
                  <a id="A1" class="btnLook" href="ListMerchant.aspx"  rel=""    runat=server lookupgroup="">选择商铺</a> 
            </p>
            <!--[if lte IE 7]><span style="clear:both;height:1px;width:100%;margin-top:-1px"></span><![endif]-->

            
            <script type="text/javascript">
                function activityPreviewImage(file) {
                   //debugger
                    var porImg = $('#Edit_Activity_ImagePreview');
                    //判断该浏览器是否为w3c标准，既非IE浏览器   
                    if (file["files"] && file["files"][0]) {
                        //使用JavaScript的FileReader对象来读取本地数据，并且将数据结果赋值给image的src，具体该对象如何实现的还未深入研究  
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            porImg.attr('src', evt.target.result);
                        }
                        reader.readAsDataURL(file.files[0]);
                    }
                    //如果是IE浏览器，采用滤镜效果，进行显示，但特别注意的是该滤镜效果使用的对象是div对象，并非img对象，因此我们需要将原有的img对象remove同时生成新的div对象，并且赋值相应的class和id  
                    else {
                        //创建需要滤镜显示的div的dom对象  
                        var ieImageDom = document.createElement("div");
                        //设置对象的css属性和原有的img对象属性相同，添加相应的id属性值  
                        $(ieImageDom).css({
                            margin: '10px',
                            width: '360px',
                            height: '95px'
                        }).attr({ "id": "Edit_Activity_ImagePreview" });
                        //删除原有img对象，append创建div的dom对象  
                        $(ieImageDom).insertAfter("#Edit_Activity_Image");
                        porImg.remove();
                        //采用滤镜效果生成图片预览  
                        file.select();
                        path = document.selection.createRange().text;
                        $(ieImageDom).css({ "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")" });
                    }
                }
            </script>

            <script type="text/javascript">
                function activityPreviewSubImage(file) {
                   //debugger
                    var porImg = $('#Edit_Activity_SubImagePreview');
                    //判断该浏览器是否为w3c标准，既非IE浏览器   
                    if (file["files"] && file["files"][0]) {
                        //使用JavaScript的FileReader对象来读取本地数据，并且将数据结果赋值给image的src，具体该对象如何实现的还未深入研究  
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            porImg.attr('src', evt.target.result);
                        }
                        reader.readAsDataURL(file.files[0]);
                    }
                    //如果是IE浏览器，采用滤镜效果，进行显示，但特别注意的是该滤镜效果使用的对象是div对象，并非img对象，因此我们需要将原有的img对象remove同时生成新的div对象，并且赋值相应的class和id  
                    else {
                        //创建需要滤镜显示的div的dom对象  
                        var ieImageDom = document.createElement("div");
                        //设置对象的css属性和原有的img对象属性相同，添加相应的id属性值  
                        $(ieImageDom).css({
                            margin: '10px',
                            width: '360px',
                            height: '95px'
                        }).attr({ "id": "Edit_Activity_SubImagePreview" });
                        //删除原有img对象，append创建div的dom对象  
                        $(ieImageDom).insertAfter("#Edit_Activity_SubImage");
                        porImg.remove();
                        //采用滤镜效果生成图片预览  
                        file.select();
                        path = document.selection.createRange().text;
                        $(ieImageDom).css({ "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")" });
                    }
                }
            </script>

            <p style="clear:left;height: 150px">
                <label>
                    幻灯图片上传：</label>
                <input id="Edit_Activity_Image" type="file" class=" textInput gray" runat="server" onchange="activityPreviewImage(this);"/>

                <img id="Edit_Activity_ImagePreview" runat="server" style="margin:10px;width: 360px; height: 95px" />
                  <span style="color: red; width: 380px">&nbsp;&nbsp;&nbsp;&nbsp;请上传1600×420的幻灯图片(格式：.jpg/.jpeg/.png/.gif/.bmp)
                </span>
            </p>


            <p style="height: 150px">
                <label>
                    标题图片上传：</label>
                <input id="Edit_Activity_SubImage" type="file" class=" textInput gray" runat="server"  onchange="activityPreviewSubImage(this);"/>

                <img  id="Edit_Activity_SubImagePreview" runat="server" style="margin:10px;width: 360px; height: 95px" />
                 <span style="color: red; width: 380px">&nbsp;&nbsp;&nbsp;&nbsp;请上传760×210的标题图片(格式：.png)
                </span>
            </p>
            <!--[if lte IE 7]><span style="clear:both;height:1px;width:100%;margin-top:-1px"></span><![endif]-->
          
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
<script   type="text/javascript">
    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';
        $(document).one("panelloaded", function (e, o) {
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


            o = null;

        });


    });
</script>