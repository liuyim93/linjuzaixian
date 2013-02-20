<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditSchool.aspx.cs" Inherits="Friday.mvc.weblogin.school.pEditSchool" %>

<div class="page" style="">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>修改学校</span>
           </a></li>
           
        </ul>
    </div>
        <form id="form" method="post"  class="pageForm required-validate" 
        onsubmit="return validateCallback(this,navTabAjaxDone)" runat="server" >
    <div class="panel collapse" defh="95">
        <h1>
            学校信息</h1>
        <div>
        <input type="hidden" id="MyOrderId" size="30" runat="server" />
      
         <p>
                <label>
                    学校名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    简称：</label>
                <input type="text" id="ShortName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    所在城市：</label>
                <input type="text" id="CityName" size="30" class="required textInput gray" runat="server" />
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
    </div>
</div>

<script   type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"] %>';
 
        $(document).one("panelloaded", function (e, o) {

            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });

            o = null;

        });


    });
</script>