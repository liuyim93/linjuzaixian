using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.components
{
    public interface ICache
    {
        object GetApplicationCache(string key);

        void SetApplicationCache(string key, object obj);

        void RemoveApplicationCache(string key);

        object GetSessionCache(string key);

        void SetSessionCache(string key, object obj);

        void RemoveSessionCache(string key);
    }
}
