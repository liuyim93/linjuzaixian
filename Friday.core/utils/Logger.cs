using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.Diagnostics;

namespace friday.core.utils
{
    public class Logger : ILogger
    {
        LogWriter writer;
        public Logger()
        {
            writer = EnterpriseLibraryContainer.Current.GetInstance<LogWriter>();
        }

        //public Logger(LogWriter logWriter)
        //{
        //    writer = logWriter;
        //}

        public void Write(LogEntry logEntry)
        {
            writer.Write(logEntry);
        }

        public void Write(object message)
        {
            writer.Write(message);
        }

        public void Write(object message, string category)
        {
            writer.Write(message, category);
        }

        public void Write(object message, string category, int eventId)
        {
            writer.Write(message, category, eventId);
        }

        public void Write(object message, string category, int eventId, int priority)
        {
            writer.Write(message, category, eventId, priority);
        }

        public void Write(object message, string category, int eventId, int priority, TraceEventType severity)
        {
            writer.Write(message, category, priority, eventId, severity);
        }

        public bool ShouldLog(LogEntry logEntry)
        {
            return writer.ShouldLog(logEntry);
        }


    }
}
