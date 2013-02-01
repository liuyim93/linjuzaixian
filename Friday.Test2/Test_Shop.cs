﻿using System;
using System.Collections.Generic;
using System.Text;
using Gallio.Framework;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;

namespace Friday.Test2
{
    [TestFixture]
    public class Test_Shop
    {
        [Test]
        public void Test()
        {
            IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
            IList<Shop> iShops = new List<Shop>();

            Shop s1 = new Shop()
            {
                 Distance="10", Address="erhuan10", Email="ocam10@163.com", EntityIndex=10, Name="ele10", Owener="basil10", Rate=10 

            };
            iShops.Add(s1);
            Shop s2 = new Shop()
            {
                Distance = "20", Address = "erhuan20",Email = "ocam20@163.com",EntityIndex = 20,Name = "ele20",Owener = "basil20",Rate = 20
            };
            iShops.Add(s2);
            Shop s3 = new Shop()
            {
                Distance = "30",Address = "erhuan30",Email = "ocam30@163.com",EntityIndex = 30,Name = "ele30",Owener = "basil30",Rate = 30

            };
            iShops.Add(s3);
            foreach (Shop a in iShops)
            {
                iShopRepository.SaveOrUpdate(a);
            }

        }

        [Test]
        public void Test_Rent()
        {
            IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
            IList<Rent> iRents = new List<Rent>();

            Rent s1 = new Rent()
            {
                Distance = "10",
                Address = "erhuan10",
                Email = "ocam10@163.com",
                EntityIndex = 10,
                Name = "ele10",
                Owener = "basil10",
                Rate = 10

            };
            iRents.Add(s1);
            Rent s2 = new Rent()
            {
                Distance = "20",
                Address = "erhuan20",
                Email = "ocam20@163.com",
                EntityIndex = 20,
                Name = "ele20",
                Owener = "basil20",
                Rate = 20
            };
            iRents.Add(s2);
            Rent s3 = new Rent()
            {
                Distance = "30",
                Address = "erhuan30",
                Email = "ocam30@163.com",
                EntityIndex = 30,
                Name = "ele30",
                Owener = "basil30",
                Rate = 30

            };
            iRents.Add(s3);
            foreach (Rent a in iRents)
            {
                iRentRepository.SaveOrUpdate(a);
            }

        }






    }
}
