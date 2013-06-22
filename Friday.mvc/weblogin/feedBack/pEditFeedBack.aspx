﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditFeedBack.aspx.cs" Inherits="Friday.mvc.weblogin.feedBack.pEditFeedBack" %>

<div class="page" style="">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>修改活动信息</span>
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
                    消息类型：</label>
                <input type="text" id="Type" size="30" class="required textInput gray" runat="server" />
            </p>
         <p>
         </p>
         <p></p>
         
             <p>
                    <label>
                        详细内容：</label>
                     
                        <textarea id="Contents" name="Contents" rows="20"   style="width:800px"
                            runat="server"></textarea>
                     
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