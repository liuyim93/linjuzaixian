using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    /// <summary>
    /// 逻辑判断错误
    /// </summary>
    public class ValidationException : WeatException
    {
        public ValidationException(string message) : base(message) { }
    }
}
