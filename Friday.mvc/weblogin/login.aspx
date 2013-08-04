<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="friday.mvc.login" %>

<!doctype html public "-//w3c//dtd html 4.01 transitional//en" "http://www.w3c.org/tr/1999/rec-html401-19991224/loose.dtd">
<!-- saved from url=(0024)http://admin.518fax.net/ -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>管理员登录</title>
    <link href="../Content/adminLogin.css" type="text/css" rel="stylesheet" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="MSHTML 6.00.6000.16809" name="GENERATOR" />
    <script type="text/javascript">
        $(document).ready(function () {
            (function () {
                var message = "<%=Request.Params["message"] %>";
                  if (message != '' || message != null) {
                      alert(message);
                  }
              })();
          });

    </script>
</head>
<body id="userlogin_body">
    <form id="theform" name="theform" action="login.aspx?flag=login" method="post">

        <div id="panSiteFactory">
            <div id="siteFactoryLogin">
                <div id="user_login">
                    <dl>
                        <dd id="user_top">
                            <ul>
                                <li class="user_top_l"></li>
                                <li class="user_top_c"></li>
                                <li class="user_top_r"></li>
                            </ul>
                        </dd>
                        <dd id="user_main">
                            <ul>
                                <li class="user_main_l"></li>
                                <li class="user_main_c">
                                    <div class="user_main_box">
                                        <ul>
                                            <li class="user_main_text">用户名： </li>
                                            <li class="user_main_input">
                                                <input class="TxtUserNameCssClass" id="account" maxlength="20" name="account" />
                                            </li>
                                        </ul>
                                        <ul>
                                            <li class="user_main_text">密 码： </li>
                                            <li class="user_main_input">
                                                <input class="TxtPasswordCssClass" id="password" type="password" name="password" /></li>
                                        </ul>

                                        <ul style="display: none">
                                            <li class="user_main_text">验证码： </li>
                                            <li class="user_main_input">
                                                <input class="TxtYanzheng" id="userauthcode" name="userauthcode" />
                                            </li>
                                            <li>
                                                <img id="imgVerify" src="/VerifyCode.aspx?" alt="看不清？点击更换" onclick="this.src=this.src+'?'" border="0" class="captcha" />
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="user_main_r">
                                    <input type="submit" value="登录" /></li>


                            </ul>
                        </dd>
                        <dd id="user_bottom"></dd>
                    </dl>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
