<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pReplyFeedBack.aspx.cs" Inherits="Friday.mvc.weblogin.feedBack.pReplyFeedBack" %>

<div class="page" style="">
    <div class="pageContent" layoutH="20">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>回复反馈信息</span>
           </a></li>
           
        </ul>
    </div>
       <form id="form" method="post"  class="pageForm required-validate" 
        onsubmit="return validateCallback(this,navTabAjaxDone)" enctype="multipart/form-data" runat="server" >
        <div class="pageFormContent" style=" height:300px">
         
            <h1>
                基本信息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
        
            
            <p>
                <label>
                    回复类型：</label>
                <input type="text" id="Type"  size="30" class="required textInput gray" runat="server" />
            </p>
                 <!--[if lte IE 7]><span style="clear:both;height:1px;width:100%;margin-top:-1px"></span><![endif]-->
            <p style="clear:left">
                    <label>
                        详细内容：</label>
                    <div style="width: 100%;">
                        <textarea id="Contents" name="Contents" rows="10" cols="240" style="width: 100%"
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
<script   type="text/javascript">
    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';
        $(document).one("panelloaded", function (e, o) {
            o.find("#Contents").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


            o = null;

        });


    });
</script>