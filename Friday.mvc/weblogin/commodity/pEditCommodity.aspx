<%@ Page Language="C#" AutoEventWireup="true" validateRequest="false" CodeBehind="pEditCommodity.aspx.cs" Inherits="Friday.mvc.weblogin.pEditCommodity" %>

<div class="pageFormContent">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
    <div class="panel collapse">
            <h1>
                商品基本信息</h1>
            <input type="hidden" id="FoodId" size="30" runat="server" />
             <p>
                <label>
                    商品名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
           <%-- <p>
                <label>
                   商品当前价格：</label>
                <input type="text" id="Price" size="30" class="required textInput gray number" min="0" runat="server" />
            </p>
            <p>
                <label>
                   商品过去价格：</label>
                <input type="text" id="OldPrice" size="30" class="required textInput gray number" min="0"  runat="server" />
            </p>--%>
         <%--   <p>
                <label>
                    库存量：</label>
                <input type="text" id="InventoryCount" size="30" class="required textInput gray digits" min="0" runat="server" />
            </p>
           
            <p>
                <label>
                    Limited：</label>
                <select name="IsLimited" id="IsLimited" class="required" runat="server">
            <option value="" >请选择</option>
            <option value="True" >Yes</option>
            <option value="False" >No</option>
          
            </select>
            </p>
           
            <p>
            <label>
                    上/下架：</label>
           <select name="IsEnabled" id="IsEnabled" class="required"  runat="server">
            <option value="" >请选择</option>
            <option value="True" >上架</option>
            <option value="False" >下架</option>
          
            </select>
            </p>
              <p>
            <label>
                    是否打折：</label>
           <select name="IsDiscount" id="IsDiscount" class="required"  runat="server">
            <option value="" >请选择</option>
            <option value="True" >是</option>
            <option value="False" >否</option>
          
            </select>
            </p>
            <p>
                <label>
                    折扣库存量：</label>
                <input type="text" id="DiscountInventoryCount" size="30" class="required textInput gray digits" min="0"  runat="server" />
            </p>
          
            <p>
                <label>
                    折扣价格：</label>
                <input type="text" id="DiscountPrice" size="30" class="required textInput gray number" min="0" runat="server" />
            </p>
 --%>
            <p>
                <label>
                    商品类型：</label>
                <input type="text" id="GoodsType" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="GoodsTypeID"  runat="server" />
                <a class="btnLook" href="ListGlobalGoodsType.aspx" rel="" lookupgroup="">选择类型</a>
            </p>
                     
<%--            <p>
                <label>
                    月售额：</label>
                <input type="text" id="MonthAmount" size="30" class="number required"  min="0"  runat="server" />
            </p>
              <p>
                <label>
                    销售额：</label>
                <input type="text" id="Amount" size="30" class="number required"  min="0"  runat="server" />
            </p>--%>

            <script type="text/javascript">
                function commodityPreviewImage(file) {
                    debugger
                    var porImg = $('#Edit_Commodity_LogoPreview');
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
                        }).attr({ "id": "Edit_Commodity_LogoPreview" });
                        //删除原有img对象，append创建div的dom对象  
                        $(ieImageDom).insertAfter("#Edit_Commodity_Logo");
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
                <input id="Edit_Commodity_Logo" type="file" class="required textInput gray" runat="server" onchange="commodityPreviewImage(this);"/>
               
                <img  id="Edit_Commodity_LogoPreview" runat="server" style="margin:10px;width: 360px; height: 95px" />
                <span style="color: red; width: 380px">请上传600×900的标题图片(格式：.jpg/.jpeg/.png/.gif/.bmp)
                </span>
            </p>

                <div style="clear:left; margin-top:0px" >
             <p>
                 <label>详细内容：</label>
                <div>
				 	<textarea id="Description" name="Description" rows="20" cols="200" style="width: 100%" runat="server"></textarea>
				</div>
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