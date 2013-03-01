<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddLoginUser.aspx.cs" Inherits="Friday.mvc.weblogin.pAddLoginUser" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
    <div class="panel collapse" defh="95">
        <h1>
            用户账户信息</h1>
        <div>
            <p>
                <label>
                    登录名：</label>
                <input type="text" id="LoginName" size="30" class="required textInput gray"  runat="server" />
            </p>
            <p>
                <label>
                    密码：</label>
                <input type="password" id="Password" size="30" class="required textInput gray"  runat="server" />
            </p>
                <p>
                <label>
                    密码确认：</label>
                <input type="password" id="PasswordAgain" size="30" class="required textInput gray" equalto="#Password"  runat="server" />
                </p>

                <p>
                    <label>管理员:</label>
                    <select name="IsAdminV" id="IsAdminV" runat="server">
                    <option value="">请选择</option>
                    <option value="是">是</option>
                    <option value="否">否</option>
                    </select>
                </p>
                 <p>
                    <label>
                        用户角色：</label>
                    <input type="text" id="NameSet" size="35"  
                        runat="server" readonly="true" />
                    <input type="hidden" id="IDSet" size="35"  
                    runat="server" readonly="true" />
                    <a class="btnLook" href="MultiListSystemRole.aspx?IDSet={IDSet}&NameSet={NameSet}"  rel=""  lookupgroup="">选择角色</a>
                </p>  
            
                  <p>
                <label>
                    商铺名称：</label>
                <input type="text" id="Merchant" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="MerchantID"  runat="server" />
                <a class="btnLook" href="ListMerchant.aspx" rel="" lookupgroup="">选择商铺</a>
            </p>

                 <%--<p>
                     <label>
                         用户类型:</label>
                    <select name="UserType" id="UserType" runat="server">
                    <option value="">请选择</option>
                    <option value="管理员">管理员</option>
                    <option value="顾客">顾客</option>
                    <option value="商店">商店</option>
                    <option value="餐馆">餐馆</option>
                    <option value="租房">租房</option>
                    <option value="送货员">送货员</option>
                    <option value="商铺店小二">商铺店小二</option>
                    <option value="餐馆店小二">餐馆店小二</option>
                    <option value="租房店小二">租房店小二</option>
                    <option value="会员用户">会员用户</option>
                    </select>
                 </p> --%>
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