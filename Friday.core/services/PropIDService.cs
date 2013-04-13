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
    public class PropIDService : IPropIDService
    {

         private IPropIDRepository iPropIDRepository;
        private ILogger iLogger;
        public PropIDService(IPropIDRepository iPropIDRepository, ILogger iLogger)
        {
            this.iPropIDRepository = iPropIDRepository;
            this.iLogger = iLogger;
        }
        public PropID Load(string id)
        {
            return iPropIDRepository.Load(id);
        }
        public IList<PropID> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iPropIDRepository.Search(termList, start, limit, out total);
        }




    }
}
