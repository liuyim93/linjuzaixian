<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="friday.mvc.index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <meta http-equiv="X-UA-Compatible" content="IE=7" />
    <title>weat</title>
    <link href="themes/default/style.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="themes/css/core.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="themes/css/print.css" rel="stylesheet" type="text/css" media="print" />
    <link href="uploadify/css/uploadify.css" rel="stylesheet" type="text/css" media="screen" />
    <!--[if IE]>
<link href="themes/css/ieHack.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->
    <script src="js/speedup.js" type="text/javascript"></script>
    <script src="js/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="js/jquery.cookie.js" type="text/javascript"></script>
    <script src="js/jquery.validate.js" type="text/javascript"></script>
    <script src="js/jquery.bgiframe.js" type="text/javascript"></script>
    <script src="xheditor/xheditor-1.1.14-zh-cn.min.js" type="text/javascript"></script>
    <script src="uploadify/scripts/swfobject.js" type="text/javascript"></script>
    <script src="uploadify/scripts/jquery.uploadify.v2.1.0.js" type="text/javascript"></script>
    <!-- svgͼ��  supports Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+ -->
    <script type="text/javascript" src="chart/raphael.js"></script>
    <script type="text/javascript" src="chart/g.raphael.js"></script>
    <script type="text/javascript" src="chart/g.bar.js"></script>
    <script type="text/javascript" src="chart/g.line.js"></script>
    <script type="text/javascript" src="chart/g.pie.js"></script>
    <script type="text/javascript" src="chart/g.dot.js"></script>
    <script src="js/dwz.core.js" type="text/javascript"></script>
    <script src="js/dwz.util.date.js" type="text/javascript"></script>
    <script src="js/dwz.validate.method.js" type="text/javascript"></script>
    <script src="js/dwz.regional.zh.js" type="text/javascript"></script>
    <script src="js/dwz.barDrag.js" type="text/javascript"></script>
    <script src="js/dwz.drag.js" type="text/javascript"></script>
    <script src="js/dwz.tree.js" type="text/javascript"></script>
    <script src="js/dwz.accordion.js" type="text/javascript"></script>
    <!-2013-01-12 basilwang add page.js->
    <script src="js/dwz.page.js" type="text/javascript"></script>

    <script src="js/dwz.ui.js" type="text/javascript"></script>
    <script src="js/dwz.theme.js" type="text/javascript"></script>
    <script src="js/dwz.switchEnv.js" type="text/javascript"></script>
    <script src="js/dwz.alertMsg.js" type="text/javascript"></script>
    <script src="js/dwz.contextmenu.js" type="text/javascript"></script>
    <script src="js/dwz.navTab.js" type="text/javascript"></script>
    <script src="js/dwz.tab.js" type="text/javascript"></script>
    <script src="js/dwz.resize.js" type="text/javascript"></script>
    <script src="js/dwz.dialog.js" type="text/javascript"></script>
    <script src="js/dwz.dialogDrag.js" type="text/javascript"></script>
    <script src="js/dwz.sortDrag.js" type="text/javascript"></script>
    <script src="js/dwz.cssTable.js" type="text/javascript"></script>
    <script src="js/dwz.stable.js" type="text/javascript"></script>
    <script src="js/dwz.taskBar.js" type="text/javascript"></script>
    <script src="js/dwz.ajax.js" type="text/javascript"></script>
    <script src="js/dwz.pagination.js" type="text/javascript"></script>
    <script src="js/dwz.database.js" type="text/javascript"></script>
    <script src="js/dwz.datepicker.js" type="text/javascript"></script>
    <script src="js/dwz.effects.js" type="text/javascript"></script>
    <script src="js/dwz.panel.js" type="text/javascript"></script>
    <script src="js/dwz.checkbox.js" type="text/javascript"></script>
    <script src="js/dwz.history.js" type="text/javascript"></script>
    <script src="js/dwz.combox.js" type="text/javascript"></script>
    <script src="js/dwz.print.js" type="text/javascript"></script>


    <!--
<script src="bin/dwz.min.js" type="text/javascript"></script>
-->
    <script src="js/dwz.regional.zh.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            DWZ.init("dwz.frag.xml", {
                loginUrl: "login_dialog.html", loginTitle: "��¼", // ������¼�Ի���
                //		loginUrl:"login.html",	// ������¼ҳ��
                statusCode: { ok: 200, error: 300, timeout: 301 }, //����ѡ��
                pageInfo: { pageNum: "pageNum", numPerPage: "numPerPage", orderField: "orderField", orderDirection: "orderDirection" }, //����ѡ��
                debug: false, // ����ģʽ ��true|false��
                callback: function () {
                    initEnv();
                    $("#themeList").theme({ themeBase: "themes" }); // themeBase �����indexҳ�������base·��
                }
            });
        });
        

</script>
</head>
<body scroll="no">
    <div id="layout">
        <div id="header">
            <div class="headerNav">
                <a class="logo" href="javascript:void(0)">��־</a>
                <ul class="nav">
                    <li>
                        <label id="labLogin" name="labLogin" runat="server" style="color: White; height: 18px;">
                        </label>
                    </li>
                    <li>
                        <label id="labLoginDate" runat="server" style="color: White">
                        </label>
                    </li>
                </ul>
                <ul class="themeList" id="themeList">
                    <li>
                        <label style="color: White">
                            ��ѡ��������ɫ��</label></li>
                    <li theme="default">
                        <div class="selected">
                            ��ɫ</div>
                    </li>
                    <li theme="green">
                        <div>
                            ��ɫ</div>
                    </li>
                    <li theme="purple">
                        <div>
                            ��ɫ</div>
                    </li>
                    <li theme="silver">
                        <div>
                            ��ɫ</div>
                    </li>
                    <li></li>
                    <li></li>
                    <li><a href="index.aspx?flag=logout" style="color: White">�˳�</a></li>
                </ul>
            </div>
        </div>
        <div id="leftside">
            <div id="sidebar_s">
                <div class="collapse">
                    <div class="toggleCollapse">
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="sidebar">
                <div class="toggleCollapse">
                    <h2>
                        ���˵�</h2>
                    <div>
                        ����</div>
                </div>
                <!--2012-06-07  �ӷ���		
			<div class="accordion" fillspace="sideBar" id="divMenu" runat="server">
                </div>
		
				-->
                <div class="accordion">
                    <ul class="tree treeFolder">
                        <li><a href="javascript:void(0)">ϵͳ����</a>
                            <ul>
                               <li><a href="activity/pActivityList.aspx" target="navTab" rel="">Activity����</a></li>
                                <li><a href="shop/pShopList.aspx" target="navTab" rel="">�̵����</a></li>
                                <li><a href="rent/pRentList.aspx" target="navTab" rel="">�ⷿ����</a></li>
                                <li><a href="globalGoodsType/pGlobalGoodsTypeList.aspx" target="navTab" rel="">��Ʒ���͹���</a></li>
                                <li><a href="restaurant/pRestaurantList.aspx" target="navTab" rel="">�͹ݹ���</a></li>
                                <li><a href="merchantCategory/pMerchantCategoryList.aspx" target="navTab" rel="">���̾�Ӫ����</a></li>
                                <li><a href="school/pSchoolList.aspx" target="navTab" rel="">ѧУ����</a></li>
                                <li><a href="systemUser/pSystemUserList.aspx" target="navTab" rel="">�˿��û�����</a></li>
                                <li><a href="loginUser/pLoginUserList.aspx" target="navTab" rel="">�û��˺Ź���</a></li> 
                                <li><a href="message/pMessageList.aspx" target="navTab" rel="">��Ϣ����</a></li>
                                <li><a href="myFoodOrder/pMyFoodOrderList.aspx" target="navTab" rel="">��ʳ��������</a></li> 
                                <li><a href="myHouseOrder/pMyHouseOrderList.aspx" target="navTab" rel="">�ⷿ��������</a></li> 
                                <li><a href="systemRole/pSystemRoleList.aspx" target="navTab" rel="">��ɫȨ�޹���</a></li> 
                                <li><a href="permission/pSystemFunctionObjectTree.aspx" target="navTab" rel="">����ģ�����</a></li> 
                                <li><a href="FoodList.aspx" target="navTab" rel="">test3</a></li>
                                <li><a href="MyOrderList.aspx" target="navTab" rel="">test4</a></li>
                                <li><a href="FeedBackList.aspx" target="navTab" rel="">test5</a></li>
                                <li><a href="ActivityList.aspx" target="navTab" rel="">test6</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="tree treeFolder">
                        <li><a href="javascript:void(0)">ҵ����</a>
                            <ul>
                                <li><a href="ProfitList.aspx" target="navTab" rel="ProfitList">test7</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="container">
            <div id="navTab" class="tabsPage">
                <div class="tabsPageHeader">
                    <div class="tabsPageHeaderContent">
                        <!-- ��ʾ���ҿ���ʱ��� class="tabsPageHeaderMargin" -->
                        <ul class="navTab-tab">
                            <li tabid="main" class="main"><a href="javascript:;"><span><span class="home_icon">�ҵ���ҳ</span></span></a></li>
                        </ul>
                    </div>
                    <div class="tabsLeft">
                        left</div>
                    <!-- ����ֻ��Ҫ���һ����ʽ class="tabsLeft tabsLeftDisabled" -->
                    <div class="tabsRight">
                        right</div>
                    <!-- ����ֻ��Ҫ���һ����ʽ class="tabsRight tabsRightDisabled" -->
                    <div class="tabsMore">
                        more</div>
                </div>
                <ul class="tabsMoreList">
                    <li><a href="javascript:;">�ҵ���ҳ</a></li>
                </ul>
                <div class="navTab-panel tabsPageContent layoutBox">
                    <div class="page unitBox">
                        <div class="accountInfo">
                        </div>
                        <div class="pageFormContent" layouth="80" style="margin-right: 230px">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="footer">
        Copyright &copy; 2012 <a href="">weat</a>
    </div>
    <form id="pagerForm">
    </form>
</body>
</html>
