using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.Diagnostics;
using friday.core.services;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace friday.core.utils
{
    public class Logger : ILogger
    {
        LogWriter writer;
        public Logger()
        {
            Database db = EnterpriseLibraryContainer.Current.GetInstance<Database>();
            writer = UnityHelper.UnityToT<LogWriter>();
            //writer = EnterpriseLibraryContainer.Current.GetInstance<LogWriter>();
        }

        //public Logger(LogWriter logWriter)
        //{
        //    writer = logWriter;
        //}

        //public void Write(LogEntry logEntry)
        //{
        //    writer.Write(logEntry);
        //}

        //public void Write(object message)
        //{
        //    writer.Write(message);
        //}

        //public void Write(object message, string category)
        //{
        //    writer.Write(message, category);
        //}

        //public void Write(object message, string category, int eventId)
        //{
        //    writer.Write(message, category, eventId);
        //}

        //public void Write(object message, string category, int eventId, int priority)
        //{
        //    writer.Write(message, category, eventId, priority);
        //}

        //public void Write(object message, string category, int eventId, int priority, TraceEventType severity)
        //{
        //    writer.Write(message, category, priority, eventId, severity);
        //}

        //public bool ShouldLog(LogEntry logEntry)
        //{
        //    return writer.ShouldLog(logEntry);
        //}
        public void LogMessage(string message, string className,EventDataTypeCategory categories)
        {
            // Create LogEntry
            LogEntry logEntry = new LogEntry();
            logEntry.Message = message;
            // Add all categories
            foreach (EventDataTypeCategory enumValue in System.Enum.GetValues(typeof(EventDataTypeCategory)))
            {
                if ((enumValue & categories) == enumValue)
                {
                    logEntry.Categories.Add(enumValue.ToString());
                }
            }

            if (className != null)
            {
                logEntry.Categories.Add(className);
            }

            writer.Write(logEntry);
        }


    }
    [Flags]
    public enum EventDataTypeCategory
    {
        无 = 0x0,
        错误 = 0x1,
        警告 = 0x2,
        信息 = 0x4,
        调试 = 0x8,
        跟踪 = 0x10,
        每日任务 = 0x20,
        操作日志 = 0x40,
        异常日志 = 0x80,
        短信日志 = 0x100,

        //餐馆模块 = 0x1000,
        //订单模块 = 0x2000,
        //统计模块 = 0x4000,
        //学校模块 = 0x8000,
        //系统用户模块 = 0x10000,
        //短消息模块 = 0x20000,
        //点评模块 = 0x40000,


    }
}
