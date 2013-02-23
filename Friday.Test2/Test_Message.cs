using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_Message
    {
        [Test]
        public void Test()
        {
            IRepository<Message> iMessageRepository = UnityHelper.UnityToT<IRepository<Message>>();
            IRepository<MessageContent> iMessageContentRepository = UnityHelper.UnityToT<IRepository<MessageContent>>();
            IList<Message> iMessages = new List<Message>();

            MessageContent mc = new MessageContent()
            {
                Content = "阿里巴巴员工2013年初收到了史上最丰厚的年终大礼包。"
            };

            Message act1 = new Message()
            {
                ThreadIndex = "1元旦大酬宾",
                MessageContent=mc               

            };
            iMessages.Add(act1);
            Message act2 = new Message()
            {
                ThreadIndex = "2元旦大酬宾",
                MessageContent=mc   
            };
            iMessages.Add(act2);
            Message act3 = new Message()
            {
                ThreadIndex = "3元旦大酬宾",
                MessageContent=mc   

            };
            iMessages.Add(act3);
            foreach (Message a in iMessages)
            {
                iMessageRepository.SaveOrUpdate(a);
            }

        }

     
    }
}
