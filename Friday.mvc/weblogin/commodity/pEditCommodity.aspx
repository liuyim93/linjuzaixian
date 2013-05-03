<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditCommodity.aspx.cs" Inherits="Friday.mvc.weblogin.pEditCommodity" %>

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
            <p>
                <label>
                   商品当前价格：</label>
                <input type="text" id="Price" size="30" class="required textInput gray number" min="0" runat="server" />
            </p>
            <p>
                <label>
                   商品过去价格：</label>
                <input type="text" id="OldPrice" size="30" class="required textInput gray number" min="0"  runat="server" />
            </p>
            <p>
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

            <p>
            <label>
                    菜品类型：</label>
           <select name="GoodsType" id="GoodsType" class="required" runat="server">
            <option value="" >请选择</option>
            </select>
            </p>
                     
            <p>
                <label>
                    月售额：</label>
                <input type="text" id="MonthAmount" size="30" class="number required"  min="0"  runat="server" />
            </p>
              <p>
                <label>
                    销售额：</label>
                <input type="text" id="Amount" size="30" class="number required"  min="0"  runat="server" />
            </p>

            <p>
                <label>
                    附件上传：</label>
                <input id="Logo" type="file" class="textInput gray" runat="server" />
            </p>
            <p style="color: red">
                请上传商品图片(支持格式：.jpg/.jpeg/.png/.gif/.bmp)
            </p>

             <div style="clear:left; margin-top:230px" >
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
            debugger;
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