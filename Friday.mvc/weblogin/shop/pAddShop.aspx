<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddShop.aspx.cs" Inherits="Friday.mvc.weblogin.shop.pAddShop" ValidateRequest="false" %>

<div class="pageFormContent" layouth="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">

        <%-- <form id="form" method="post" class="pageForm required-validate" onsubmit="return iframeCallback(this,navTabAjaxDone)"
        enctype="multipart/form-data" runat="server">--%>
        <div class="panel collapse">
            <h1>商店基本信息</h1>
            <div>
                <input type="hidden" id="MyOrderId" size="30" runat="server" />
                <p>
                    <label>
                        商店名称：</label>
                    <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
                </p>
                <p>
                    <label>
                        简称：</label>
                    <input type="text" id="ShortName" size="30" class=" textInput gray" runat="server" />
                </p>
                <p>
                    <label>
                        店主：</label>
                    <input type="text" id="Owener" size="30" class="required textInput gray" runat="server" />
                </p>
                <p>
                    <label>
                        服务的区域：</label>
                    <input type="text" id="NameSet" size="35" class="required textInput gray"
                        runat="server" readonly="true" />
                    <input type="hidden" id="IDSet" size="30" runat="server" />
                    <a class="btnLook" href="MultiListSchool.aspx" rel="" lookupgroup="">选择学校</a>
                </p>
                <%--      <p>
                <label>
                    服务的学校：</label>
             <input type="text" id="SchoolOfMerchant" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                    <input type="text" id="SchoolName" size="35" class="required textInput gray"
                    runat="server" readonly="true" />
                    <input type="hidden" id="SchoolID" size="30" runat="server" />
                <a class="btnLook" href="ListSchool.aspx" rel=""  lookupgroup="">选择学校</a>
            </p>--%>
                <%--      <p>
                <label>
                    仅演示，应隐藏ID</label>
                <input type="text" id="SchoolOfMerchantID"  size="30" class="required textInput gray"
                    runat="server" readonly="true" />
            </p>--%>

                <script type="text/javascript">
                    function shopPreviewImage(file) {
                        debugger
                        var porImg = $('#Add_Shop_ImagePreview');
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
                                width: '90px',
                                height: '45px'
                            }).attr({ "id": "Add_Shop_ImagePreview" });
                            //删除原有img对象，append创建div的dom对象  
                            $(ieImageDom).insertAfter("#Add_Shop_Image");
                            porImg.remove();
                            //采用滤镜效果生成图片预览  
                            file.select();
                            path = document.selection.createRange().text;
                            $(ieImageDom).css({ "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")" });
                        }
                    }
                </script>

                <p style="height: 120px">
                    <label>
                        Logo上传：</label>
                    <input id="Add_Shop_Image" type="file" class=" textInput gray" runat="server" onchange="shopPreviewImage(this);" />
                    <img id="Add_Shop_ImagePreview" runat="server" style="margin: 10px; width: 90px; height: 45px" />
                    <span style="color: red; width: 380px">请上传90×45的标题图片(格式：.jpg/.jpeg/.png/.gif/.bmp)
                    </span>
                </p>
            </div>
        </div>
        <div class="panel collapse">
            <h1>配送时间</h1>
            <div>
                 <p>
                    <span style="color: red; width: 380px">如有营业时间限制，状态请选择营业时间</span>
                </p>
                <p></p>
                <p>
                    <span style="color: red; width: 380px">请严格按照 XX:XX(24小时制填写营业时间)， 如 20:13 代表20点13分 </span>
                </p>
                <p>
                    <label>
                        商铺当前状态：</label>
                    <select id="ShopStatus" class="required" style="width: 85px" runat="server">
                        <option value="">请选择</option>
                        <option value="0">不限时间</option>
                        <option value="1">营业时间</option>
                        <option value="2">正在休息</option>
                    </select>
                </p>
                <p>
                    <label>
                        上午起始时间：</label>
                    <input type="text" id="MorningBeginHour" name="MorningBeginHour" size="30" class="textInput gray" runat="server" />
                </p>
                <p>
                    <label>
                        上午截止时间：</label>
                    <input type="text" id="MorningEndHour" name="MorningEndHour" size="30" class="textInput gray" runat="server" />
                </p>
                <p>
                    <label>
                        下午起始时间：</label>
                    <input type="text" id="AfternoonBeginHour" name="AfternoonBeginHour" size="30" class="textInput gray" runat="server" />
                </p>
                <p>
                    <label>
                        下午截止时间：</label>
                    <input type="text" id="AfternoonEndHour" name="AfternoonEndHour" size="30" class="textInput gray" runat="server" />
                </p>
                <p>
                    <label>
                        晚间起始时间：</label>
                    <input type="text" id="NightStartHour" name="NightStartHour" size="30" class="textInput gray" runat="server" />
                </p>
                <p>
                    <label>
                        晚间截止时间：</label>
                    <input type="text" id="NightEndHour" name="NightEndHour" size="30" class="textInput gray" runat="server" />
                </p>

            </div>
        </div>
        <div class="panel close collapse">
            <h1>联系方式</h1>
            <div>
                <p>
                    <label>
                        Tel：</label>
                    <input type="text" id="Tel" size="30" class="required textInput gray phone" runat="server" />
                </p>
                <p>
                    <label>
                        Email：</label>
                    <input type="text" id="Email" size="30" class=" email" runat="server" />
                </p>
                <p>
                    <label>
                        地址：</label>
                    <input type="text" id="Address" size="30" class="required Address" runat="server" />
                </p>
                <p>
                    <label>
                        距离：</label>
                    <input type="text" id="Distance" size="30" class=" textInput gray digits" min="0" runat="server" />
                </p>
                <p>
                    <label>
                        折扣：</label>
                    <input type="text" id="Rate" size="30" class=" textInput gray digits" min="0" runat="server" />
                </p>

            </div>
        </div>
        <div class="panel close collapse">
            <h1>公告和Logo</h1>
            <div>
                <div style="clear: left; width: 80%; margin-top: 20px">
                    <p>
                        <label>
                            商铺公告：</label>
                        <div style="width: 100%;">
                            <textarea id="Bulletins" name="Bulletins" rows="20" cols="240" style="width: 100%"
                                runat="server"></textarea>
                        </div>
                    </p>
                </div>

                <div style="clear: left; width: 80%; margin-top: 30px">
                    <p>
                        <label>
                            商铺活动：</label>
                        <div style="width: 100%;">
                            <textarea id="Activity" name="Activity" rows="20" cols="240" style="width: 100%"
                                runat="server"></textarea>
                        </div>
                    </p>
                </div>

                <div style="clear: left; width: 80%; margin-top: 40px">
                    <p>
                        <label>
                            详细内容：</label>
                        <div style="width: 100%;">
                            <textarea id="Description" name="Description" rows="20" cols="240" style="width: 100%"
                                runat="server"></textarea>
                        </div>
                    </p>
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
    <a href="commodity/pCommodityList.aspx" prefix='<%=Request.Params["prefix"] %>' target="ajax"
        rel_v3="jbsxBox1" style="display: none">load</a>
    <div id="jbsxBox1">
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
            o.find("#Bulletins").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });
            o.find("#Activity").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });
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
