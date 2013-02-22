<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditHouse.aspx.cs" Inherits="Friday.mvc.weblogin.pEditHouse" %>

<div class="page">
    <div class="pageContent">
        <form id="form" method="post"  class="pageForm required-validate" enctype="multipart/form-data" runat="server">
        <%--2013-02-17 basilwang we still need get rel_hook after postback--%>
        <input type="hidden" name="rel_hook" value='<%=Request.Params["rel_hook"]%>' />
        <div class="pageFormContent" layoutH="80px" style="">
            <h1>
                房屋基本信息</h1>
            <input type="hidden" id="FoodId" size="30" runat="server" />
              <p>
                <label>
                    房屋名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    房屋当前价格：</label>
                <input type="text" id="Price" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    房屋过去价格：</label>
                <input type="text" id="OldPrice" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    库存量：</label>
                <input type="text" id="InventoryCount" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                    <label>起始日期:</label>
                    <input  type="text" name="TimeOfRentFrom" class="date textInput readonly" readonly="true" 
                       />
                </p>
                <p>
                    <label>截止日期:</label>
                    <input type="text" name="TimeOfRentTO" class="date textInput readonly" readonly="true" 
                       />
                </p>

        <p>   <label>出租时间:</label>
                    <input type="text" name="DaySpanOfRent"    readonly="true"
                       /></p>
            
            <p>
                <label>
                    Limited：</label>
                <select name="IsLimited" id="IsLimited" runat="server">
            <option value="" ></option>
            <option value="True" >Yes</option>
            <option value="False" >No</option>
          
            </select>
            </p>
           
            <p>
            <label>
                    上/下架：</label>
           <select name="IsEnabled" id="IsEnabled" runat="server">
            <option value="" ></option>
            <option value="True" >上架</option>
            <option value="False" >下架</option>
          
            </select>
            </p>
              <p>
            <label>
                    是否打折：</label>
           <select name="IsDiscount" id="IsDiscount" runat="server">
            <option value="" ></option>
            <option value="True" >是</option>
            <option value="False" >否</option>
          
            </select>
            </p>
            <p>
                <label>
                    折扣库存量：</label>
                <input type="text" id="DiscountInventoryCount" size="30" class="required textInput gray" runat="server" />
            </p>
          
            <p>
                <label>
                    折扣价格：</label>
                <input type="text" id="DiscountPrice" size="30" class="required textInput gray" runat="server" />
            </p>
              <p>
            <label>
                    菜品类型：</label>
           <select name="GoodsType" id="GoodsType" runat="server">
            <option value="" ></option>
            
          
            </select>
            </p>
                     
            <p>
                <label>
                    月售额：</label>
                <input type="text" id="MonthAmount" size="30" class="digits" runat="server" />
            </p>
              <p>
                <label>
                    销售额：</label>
                <input type="text" id="Amount" size="30" class="digits" runat="server" />
            </p>
             <p>
                <label>
                    删除标记：</label>
                  <select name="IsDelete" id="IsDelete" runat="server">
                   <option value="" ></option>
            <option value="True" >是</option>
            <option value="False" >否</option>
          
            </select>
            </p>
            <p>
                <label>
                    附件上传：</label>
                <input id="Logo" type="file" class="textInput gray" runat="server" />
            </p>
            <p style="color: red">
                请上传大小为190×142的食物图片(支持格式：.jpg/.jpeg/.png/.gif/.bmp)
            </p>
             
              <p >
                <img id="ImagePreview" runat="server"  style=" width:240px; height:200px" />
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