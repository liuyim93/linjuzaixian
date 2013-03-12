using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using System.Transactions;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_Message
    {
        private TransactionScope scope;
        [SetUp]
        public void SetUp()
        {
            scope = new TransactionScope();
        }

        [TearDown]
        public void TearDown()
        {
            scope.Dispose();
        }
        [Test]
        public void Test()
        {
            IRepository<Message> iMessageRepository = UnityHelper.UnityToT<IRepository<Message>>();
            IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
            IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
            IRepository<MessageContent> iMessageContentRepository = UnityHelper.UnityToT<IRepository<MessageContent>>();
            IList<Message> iMessages = new List<Message>();

            LoginUser lu = new LoginUser()
            {
                 LoginName="renxianqi",
                  Password="2222"
            };
            iLoginUserRepository.SaveOrUpdate(lu);


            Shop s3 = new Shop()
            {
                Distance = "30",
                Address = "erhuan30",
                Email = "ocam30@163.com",
                EntityIndex = 30,
                Name = "中豪大酒店",
                Owener = "basil30",
                Rate = 30

            };
            iShopRepository.SaveOrUpdate(s3);

            MessageContent mc = new MessageContent()
            {
                Content = "阿里巴巴员工2013年初收到了史上最丰厚的年终大礼包。"
            };
            iMessageContentRepository.SaveOrUpdate(mc);
            Message act1 = new Message()
            {
                ThreadIndex = "1元旦大酬宾",
                MessageContent=mc,
                LoginUser=lu,
                 Merchant=s3,
                 Direction=0,
                 IsNew=true

            };
            iMessages.Add(act1);
            Message act2 = new Message()
            {
                ThreadIndex = "2元旦大酬宾",
                MessageContent=mc,
                LoginUser = lu,
                Merchant = s3,
                Direction = 0,
                IsNew = true
            };
            iMessages.Add(act2);
            Message act3 = new Message()
            {
                ThreadIndex = "3元旦大酬宾",
                MessageContent=mc,
                LoginUser = lu,
                Merchant = s3,
                Direction = 1,
                IsNew = true

            };
            iMessages.Add(act3);
            foreach (Message a in iMessages)
            {
                iMessageRepository.SaveOrUpdate(a);
            }

        }

     
    }
}
