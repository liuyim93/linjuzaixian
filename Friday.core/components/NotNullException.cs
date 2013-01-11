using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    /// <summary>
    /// 为空验证异常
    /// </summary>
    public class NotNullException : ValidationException
    {
        public NotNullException() : base("对象或值不能为空") { }
    }
}
