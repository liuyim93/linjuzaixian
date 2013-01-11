using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public class WeatException : Exception
    {
        public WeatException(string message) : base(message) { }
        public WeatException(string message, Exception inner)
            : base(message, inner) { }
    }
}
