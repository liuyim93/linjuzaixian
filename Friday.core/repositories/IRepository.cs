using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;
using friday.core.domain;

namespace friday.core.repositories
{
    public interface IRepository<T>  where T : Entity
    {
        T Load(string id);
        T Get(string id);
        IList<T> GetAll();
     
        void SaveOrUpdate(T entity);
        void Update(T entity);
        void Delete(string id);
        void PhysicsDelete(string id);
        IList<T> GetPageList(int start, int limit, out long total);
            }

}
