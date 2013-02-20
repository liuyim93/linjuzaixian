<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSystemUserDetail.aspx.cs" Inherits="Friday.mvc.weblogin.systemUser.pSystemUserDetail" %>

<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>顾客用户基本信息</span></a></li>
                <li><a href='Food/pFoodList.aspx?uid=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox1"
                target="ajax"><span>配送地址</span></a></li>
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
                <p>
                <label>
                    登录名：</label>
                <input type="text" id="LoginName" size="30" class="required textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    真实姓名：</label>
                <input type="text" id="Name" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    联系电话：</label>
                <input type="text" id="Tel" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    电子邮箱：</label>
                <input type="text" id="Email" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
             <p>
                <label>
                    个性签名：</label>
                <input type="text" id="Description" size="30" class="required  textInput gray" readonly="readonly" runat="server" />
            </p>
         </div>

        <div id="jbsxBox1" >
        </div>
    </div>
    <div class="tabsFooter">
        <div class="tabsFooterContent">
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        var $self = $.self(page_prefix);
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {
            //o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });

        });
    });
</script>
