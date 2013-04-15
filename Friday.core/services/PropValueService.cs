﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.utils;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public class PropValueService : IPropValueService
    {

         private IPropValueRepository iPropValueRepository;
        private ILogger iLogger;
        public PropValueService(IPropValueRepository iPropValueRepository, ILogger iLogger)
        {
            this.iPropValueRepository = iPropValueRepository;
            this.iLogger = iLogger;
        }
        public PropValue Load(string id)
        {
            return iPropValueRepository.Load(id);
        }
        public IList<PropValue> Search(List<DataFilter> termList, int start, int limit, out long total)
        {
            return iPropValueRepository.Search(termList, start, limit, out total);
        }




    }
}