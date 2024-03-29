﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface IRepository<T>  where T : BaseObject
    {
        T Load(string id);
        T Load(int id);
        T Get(string id);
        T Get(int id);
        IList<T> GetAll();
     
        void SaveOrUpdate(T entity);
        void Update(T entity);
        void Delete(string id);
        void Delete(int id);
        void PhysicsDelete(string id);
        void DeleteAll(IList<T> list);
        IList<T> GetPageList(int start, int limit, out long total);
            }

}
