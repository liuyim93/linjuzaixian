using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public class SchoolService:ISchoolService
    {
        private ISchoolRepository iSchoolRepository;
        private ILogger iLogger;
        public SchoolService(ISchoolRepository iSchoolRepository, ILogger iLogger)
        {
            this.iSchoolRepository = iSchoolRepository;
            this.iLogger = iLogger;
        }
        public School Load(string id)
        {
            return iSchoolRepository.Load(id);
        }

        public void Save(School school)
        {
            iLogger.LogMessage("插入School数据，ID：" + school.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSchoolRepository.SaveOrUpdate(school);
        }

        public void Update(School school)
        {
            iLogger.LogMessage("更新School数据，ID：" + school.Id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSchoolRepository.SaveOrUpdate(school);
        }

        public void Delete(string id)
        {
            iLogger.LogMessage("删除School数据，ID：" + id, this.GetType().FullName, EventDataTypeCategory.操作日志);
            iSchoolRepository.Delete(id);
        }

        public School SearchByShortName(string name)
        {
            return iSchoolRepository.SearchByShortName(name);
        }

        public IList<School> Search(List<DataFilter> termList)
        {
            return iSchoolRepository.Search(termList);
        }

        public IList<School> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iSchoolRepository.Search(termList, start, limit, out total);
        }
        public IList<School> GetAll()
        {
            return iSchoolRepository.GetAll();
        }
    }
}
