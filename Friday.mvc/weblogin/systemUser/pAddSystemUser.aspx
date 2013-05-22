<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddSystemUser.aspx.cs" Inherits="Friday.mvc.weblogin.pAddSystemUser" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
    <div class="panel collapse" defh="95">
        <h1>
            顾客用户详细信息</h1>
        <div>
                <p>
                <label>
                    登录名：</label>
                <input type="text" id="LoginName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    密码：</label>
                <input type="password" id="Password" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
            <label>
                密码确认：</label>
            <input type="password" id="PasswordAgain" size="30" class="required textInput gray"   runat="server" />
            </p>
             <p>
                <label>
                    真实姓名：</label>
                <input type="text" id="Name" size="30" class="required  textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    联系电话：</label>
                <input type="text" id="Tel" size="30" class="required  textInput gray phone" runat="server" />
            </p>
             <p>
                <label>
                    电子邮箱：</label>
                <input type="text" id="Email" size="30" class="required  textInput gray email" runat="server" />
            </p>
             <p>
                <label>
                    个性签名：</label>
                <input type="text" id="Description" size="30" class="required  textInput gray" runat="server" />
            </p> 
            <p>
                <label>
                    所在区域：</label>
                <input type="text" id="SchoolName" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="SchoolID"  runat="server" />
                <a class="btnLook" href="ListSchool.aspx" rel="" lookupgroup="">选择区域</a>
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
                        <button type="reset" id="Button1">
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