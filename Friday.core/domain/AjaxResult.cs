using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class AjaxResult
    {

        private string statuscode;
        private string messageinfo;
        private string callbacktype;
        private string forwardurl;
        //2010-12-26 王华杰 出错后关闭，区分navtab或者dialog
        private string errorclosetype;
        private string navtabid;
        //吕兴举增加 为iframe用
        private string title;
        //王华杰 2011-04-11 工作流刷新父页
        //private string referer;
        //2013-02-13 basilwang add panelId
        private string panelid;
        public string errorCloseType
        {
            get { return this.errorclosetype; }
            set { this.errorclosetype = value; }
        }
        public string statusCode
        {
            get { return this.statuscode; }
            set { this.statuscode = value; }
        }
        public string message
        {
            get { return this.messageinfo; }
            set { this.messageinfo = value; }
        }
        public string callbackType
        {
            get { return this.callbacktype; }
            set { this.callbacktype = value; }
        }
        public string forwardUrl
        {
            get { return this.forwardurl; }
            set { this.forwardurl = value; }
        }
        public string navTabId
        {
            get { return this.navtabid; }
            set { this.navtabid = value; }
        }
        //吕兴举  增加为iframe用的title属性
        public string Title
        {
            get { return this.title; }
            set { this.title = value; }
        }
        //2013-02-13 basilwang we don't need this anymore
        ////王华杰 2011-04-11 工作流刷新父页
        //public string Referer
        //{
        //    get { return this.referer; }
        //    set { this.referer = value; }
        //}
        //2013-02-13 basilwang add panelId
        public string panelId
        {
            get { return this.panelid; }
            set { this.panelid = value; }
        }
    }
}
