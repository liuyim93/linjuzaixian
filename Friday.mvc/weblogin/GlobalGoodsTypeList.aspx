<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GlobalGoodsTypeList.aspx.cs" Inherits="Friday.mvc.weblogin.GlobalGoodsTypeList" %>

<div class="pageContent">
    <!--2013-01-16 basilwang we can't choose prefix as url parameter, if you post the copy value also via ajax post  which will double the value  -->
    <a href='globalGoodsType/pGlobalGoodsTypeList.aspx' prefix='<%=Request.Params["prefix"] %>'  rel-v3="jbsxBox2" target="ajax" style="display:none">load</a>
    <div id="jbsxBox2" class="unitBox" style="">

	</div>
      <div id="jbsxBox" class="unitBox" style="">

	</div>
	
</div>
<script type="text/javascript">

    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        var $self = $.self(page_prefix);
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $self.one("panelloaded", function (e) {

            $self.find("a[rel-v3]").trigger("click");

        });


    });
</script>
