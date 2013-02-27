using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class Log:BaseObject
    {
        //public Log()
        //{
        //    CategoryLogs = new Iesi.Collections.Generic.HashedSet<CategoryLog>();

        //}
        public virtual int LogID
        {
            get;
            set;
        }
        public virtual int EventID
        {
            get;
            set;
        }
        public virtual int Priority
        {
            get;
            set;
        }
        public virtual string Severity
        {
            get;
            set;
        }
        public virtual string Title
        {
            get;
            set;
        }
        public virtual DateTime Timestamp
        {
            get;
            set;
        }
        public virtual string MachineName
        {
            get;
            set;
        }
        public virtual string AppDomainName
        {
            get;
            set;
        }
        public virtual string ProcessID
        {
            get;
            set;
        }
        public virtual string ProcessName
        {
            get;
            set;
        }
        public virtual string ThreadName
        {
            get;
            set;
        }
        public virtual string Win32ThreadId
        {
            get;
            set;
        }
        public virtual string Message
        {
            get;
            set;
        }
        public virtual string FormattedMessage
        {
            get;
            set;
        }
        public virtual Iesi.Collections.Generic.ISet<CategoryLog> CategoryLogs
        {
            get;
            set;
        }
    }
}
