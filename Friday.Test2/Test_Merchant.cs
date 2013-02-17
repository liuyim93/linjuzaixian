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
    public class Test_Merchant
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
                Distance = "租房10",
                Address = "租房erhuan10",
                Email = "租房ocam10@163.com",
                EntityIndex = 10,
                Name = "租房ele10",
                Owener = "租房basil10",
                Rate = 10

            };
            iRents.Add(s1);
            Rent s2 = new Rent()
            {
                Distance = "租房20",
                Address = "租房erhuan20",
                Email = "租房ocam20@163.com",
                EntityIndex = 20,
                Name = "租房ele20",
                Owener = "租房basil20",
                Rate = 20
            };
            iRents.Add(s2);
            Rent s3 = new Rent()
            {
                Distance = "租房30",
                Address = "租房erhuan30",
                Email = "租房ocam30@163.com",
                EntityIndex = 30,
                Name = "租房ele30",
                Owener = "租房basil30",
                Rate = 30

            };
            iRents.Add(s3);
            foreach (Rent a in iRents)
            {
                iRentRepository.SaveOrUpdate(a);
            }

        }


        [Test]
        public void Test_Restaurant()
        {
            IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();
            IList<Restaurant> iRestaurants = new List<Restaurant>();

            Restaurant s1 = new Restaurant()
            {
                Distance = "餐厅10",
                Address = "餐厅erhuan10",
                Email = "餐厅ocam10@163.com",
                EntityIndex = 10,
                Name = "餐厅ele10",
                Owener = "餐厅basil10",
                Rate = 10

            };
            iRestaurants.Add(s1);
            Restaurant s2 = new Restaurant()
            {
                Distance = "餐厅20",
                Address = "餐厅erhuan20",
                Email = "餐厅ocam20@163.com",
                EntityIndex = 20,
                Name = "餐厅ele20",
                Owener = "餐厅basil20",
                Rate = 20
            };
            iRestaurants.Add(s2);
            Restaurant s3 = new Restaurant()
            {
                Distance = "餐厅30",
                Address = "餐厅erhuan30",
                Email = "餐厅ocam30@163.com",
                EntityIndex = 30,
                Name = "餐厅ele30",
                Owener = "餐厅basil30",
                Rate = 30

            };
            iRestaurants.Add(s3);
            foreach (Restaurant a in iRestaurants)
            {
                iRestaurantRepository.SaveOrUpdate(a);
            }

        }



    }
}
