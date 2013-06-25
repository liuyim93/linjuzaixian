<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pMessageNotification.aspx.cs" Inherits="Friday.mvc.weblogin.message.pMessageNotification" %>

<div id="popup" class="panel collapse close" style="position: relative; width: 400px;
    float: left; z-index: 45" defh="40" runat="server">
    <h1 style="visibility: hidden">
        你有新的短消息</h1>
    <div>
        <ul style="visibility: hidden">
            <asp:repeater id="repeater" runat="server" onitemdatabound="repeater_ItemDataBound">
                
                 <ItemTemplate> 
                    <li style="line-height:150%;cursor:pointer;padding-left:5px">
                       <a id="message_item" runat="server" onclick="return false" ><%#DataBinder.Eval(Container.DataItem, "MessageContent.Content")%></a>
                       <span style="margin-left:20px"><%#DataBinder.Eval(Container.DataItem, "CreateTime")%></span>
                    </li>
                </ItemTemplate>
          </asp:repeater>
        </ul>
    </div>
</div>
<script type="text/javascript">

    $(function () {
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            var popup = o.find("#popup");
            //            //2013-03-29 basilwang have to bind click again. shall we use anothor choice?
            //            var delay_fn = function () {
            //                var popup_collapse_fn = function () {
            //                    popup.find("a.collapsable").trigger("click");
            //                }
            //                setTimeout(popup_collapse_fn, 5000);

            //            };
            //            popup.find("a.expandable").bind("click", delay_fn);
            popup.find("a.expandable").trigger("click");


            popup.find("h1,ul").css('visibility', 'visible');

            popup.find("li a").bind("click", function () {
                var $li = $(this).parent();
                var message_id = $(this).attr("name");
                $li.fadeOut(1000);
                var i = "message/pMessageNotification.aspx?flag=readmsg";
                $.getJSON(i, { message_id: message_id }, function (r) {               

                });
            });

            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>
