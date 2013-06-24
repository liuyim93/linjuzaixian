<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddShop.aspx.cs" Inherits="Friday.mvc.weblogin.shop.pAddShop"   validateRequest="false"  %>

<div class="pageFormContent" layouth="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data"    runat="server">
    <div class="panel collapse">
        <h1>
            商店基本信息</h1>
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
                <input type="text" id="ShortName" size="30" class="required textInput gray" runat="server" />
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
                <a class="btnLook" href="MultiListSchool.aspx"  rel=""  lookupgroup="">选择学校</a>
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
            <p>
                <label>
                    Logo上传：</label>
                <input id="Image" type="file" class="required textInput gray"   runat="server" />
                <span style="color: red; width: 300px">
                </span>
            </p>
        </div>
    </div>
   <div class="panel collapse">
        <h1>
            配送时间</h1>
        <div>
            <p>
                <label>
                    营业时间：</label>
                <input type="text" id="ShopHours" size="30" class="required textInput gray" runat="server" />
            </p>
        </div>
    </div>
    <div class="panel close collapse">
        <h1>
            促销打折</h1>
        <div>
            <p>
                <label>
                    Tel：</label>
                <input type="text" id="Tel" size="30" class="required textInput gray phone" runat="server" />
            </p>
            <p>
                <label>
                    Email：</label>
                <input type="text" id="Email" size="30" class="required email" runat="server" />
            </p>
            <p>
                <label>
                    地址：</label>
                <input type="text" id="Address" size="30" class="required Address" runat="server" />
            </p>
            <p>
                <label>
                    距离：</label>
                <input type="text" id="Distance" size="30" class="required textInput gray digits" min="0" runat="server" />
            </p>
            <p>
                <label>
                    折扣：</label>
                <input type="text" id="Rate" size="30" class="required textInput gray digits" min="0" runat="server" />
            </p>
            <p>
                <label>
                    商铺当前状态：</label>
                <select id="ShopStatus" class="required " style="width: 85px" runat="server">
                    <option value="">请选择</option>
                    <option value="营业时间">营业时间</option>
                    <option value="正在休息">正在休息</option>
                </select>
            </p>
        </div>
    </div>
    <div class="panel close collapse">
        <h1>
            公告和Logo</h1>
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
