using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.utils
{
    public class MockLogger : ILogger
    {
        public void Write(object message)
        {
        }

        public void Write(object message, string category)
        {
        }

        public void Write(object message, string category, int eventId)
        {
        }

        public void Write(object message, string category, int eventId, int priority)
        {
        }

        public void Write(object message, string category, int eventId, int priority, System.Diagnostics.TraceEventType severity)
        {
        }
    }
}
