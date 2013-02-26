using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.repositories;
using friday.core.utils;

namespace friday.core.services
{
    public class FeedBackService:IFeedBackService
    {
        IRepository<FeedBack> iFeedBackRepository;
        ILogger iLogger;
        public FeedBackService(IRepository<FeedBack> iFeedBackRepository, ILogger iLogger)
        {
            this.iFeedBackRepository = iFeedBackRepository;
            this.iLogger = iLogger;
        }
        public void Save(FeedBack feedback)
        {
            
        }
        public void Update(FeedBack feedback)
        {

        }
        public void Delete(FeedBack feedback)
        {

        }

    }
}
