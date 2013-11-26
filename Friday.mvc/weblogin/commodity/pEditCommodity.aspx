<%@ Page Language="C#" AutoEventWireup="true" ValidateRequest="false" CodeBehind="pEditCommodity.aspx.cs" Inherits="Friday.mvc.weblogin.pEditCommodity" %>

<div class="pageFormContent">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
        <div class="tabs">
            <div class="tabsHeader">
                <div class="tabsHeaderContent">
                    <ul>
                        <li class="selected"><a href="#"><span>商品基本信息</span></a></li>
                        <li><a href="#"><span>商品图片信息</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="tabsContent" style="height: 350px;">
                <div>
                    <p>
                        <label>
                            商品名称：</label>
                        <input type="hidden" id="FoodId" size="30" runat="server" />
                        <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
                    </p>
                    <p>
                        <label>
                            商品类型：</label>
                        <input type="text" id="GoodsType" size="20" class="required textInput gray"
                            runat="server" readonly="true" />
                        <input type="hidden" id="GoodsTypeID" runat="server" />
                        <a class="btnLook" href="ListGlobalGoodsType.aspx" rel="" lookupgroup="">选择类型</a>

                    </p>
                    <p>
                        <label>详细内容：</label>
                        <div>
                            <textarea id="Description" name="Description" rows="15" cols="200" style="width: 100%" runat="server"></textarea>
                        </div>
                    </p>
                </div>
                <div>
                    <script type="text/javascript">
                        function commodityPreviewImage(file, preview_filename, filename) {
                            //debugger
                            var porImg = $('#' + preview_filename);
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
                                }).attr({ "id": preview_filename });
                                //删除原有img对象，append创建div的dom对象  
                                $(ieImageDom).insertAfter("#" + filename);
                                porImg.remove();
                                //采用滤镜效果生成图片预览  
                                file.select();
                                path = document.selection.createRange().text;
                                $(ieImageDom).css({ "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")" });
                            }
                        }
                    </script>

                    <p style="height: 150px">
                        <label>
                            标题图片上传：</label>
                        <input id="Edit_Commodity_Logo" type="file" class=" textInput gray" runat="server" onchange="commodityPreviewImage(this,'Edit_Commodity_LogoPreview','Edit_Commodity_Logo');" />

                        <img id="Edit_Commodity_LogoPreview" runat="server" style="margin: 10px; width: 360px; height: 95px" />
                        <span style="color: red; width: 380px">请上传600×900的标题图片(格式：.jpg/.jpeg/.png/.gif/.bmp)
                        </span>
                    </p>
                    <p style="height: 150px">
                        <label>
                            标题图片上传：</label>
                        <input id="Edit_Commodity_Logo1" type="file" class=" textInput gray" runat="server" onchange="commodityPreviewImage(this,'Edit_Commodity_LogoPreview1','Edit_Commodity_Logo1');" />

                        <img id="Edit_Commodity_LogoPreview1" runat="server" style="margin: 10px; width: 360px; height: 95px" />
                        <span style="color: red; width: 380px">请上传600×900的标题图片(格式：.jpg/.jpeg/.png/.gif/.bmp)
                        </span>
                    </p>
                    <p style="height: 150px">
                        <label>
                            标题图片上传：</label>
                        <input id="Edit_Commodity_Logo2" type="file" class=" textInput gray" runat="server" onchange="commodityPreviewImage(this,'Edit_Commodity_LogoPreview2','Edit_Commodity_Logo2');" />

                        <img id="Edit_Commodity_LogoPreview2" runat="server" style="margin: 10px; width: 360px; height: 95px" />
                        <span style="color: red; width: 380px">请上传600×900的标题图片(格式：.jpg/.jpeg/.png/.gif/.bmp)
                        </span>
                    </p>
                    <p style="height: 150px">
                        <label>
                            标题图片上传：</label>
                        <input id="Edit_Commodity_Logo3" type="file" class=" textInput gray" runat="server" onchange="commodityPreviewImage(this,'Edit_Commodity_LogoPreview3','Edit_Commodity_Logo3');" />

                        <img id="Edit_Commodity_LogoPreview3" runat="server" style="margin: 10px; width: 360px; height: 95px" />
                        <span style="color: red; width: 380px">请上传600×900的标题图片(格式：.jpg/.jpeg/.png/.gif/.bmp)
                        </span>
                    </p>

                </div>
            </div>
            <div class="tabsFooter">
                <div class="tabsFooterContent">
                </div>
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
                            <button type="reset" id="Clean">
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
            //o.find("a[rel_v3]").trigger("click");
            //debugger;
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });

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
