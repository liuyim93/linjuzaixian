using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using System.IO;

namespace Friday.Test2
{
    /// <summary>
    /// PopulateFakeActivityDataTest 的摘要说明
    /// </summary>
    [TestFixture]
    public class PopulateFakeActivityDataTest
    {
        [SetUp]
        public void init()
        {

            IRepository<Activity> iActivityRepository = UnityHelper.UnityToT<IRepository<Activity>>();
            IList<Activity> iActivitys = new List<Activity>();

            Activity act1 = new Activity()
            {
                  Name="甜美公主风",
                  Matters="10",
                  Description = "甜美公主风",
                  Image = "/uploadimage/jpeg1.jpg"

            };
            iActivitys.Add(act1);

            Activity act2 = new Activity()
            {
                Name = "相宜本草最红女生节",
                Matters = "10",
                Description = "相宜本草最红女生节",
                Image = "/uploadimage/jpeg2.jpg"
            };
            iActivitys.Add(act2);

            Activity act3 = new Activity()
            {
                Name = "数码家电风暴",
                Matters = "10",
                Description = "数码家电风暴",
                Image = "/uploadimage/jpeg3.jpg"

            };
            iActivitys.Add(act3);

            Activity act4 = new Activity()
            {
                Name = "2013最浪漫情人节",
                Matters = "10",
                Description = "2013最浪漫情人节",
                Image = "/uploadimage/jpeg4.jpg"

            };
            iActivitys.Add(act4);

            Activity act5 = new Activity()
            {
                Name = "爱在一起，全民来电",
                Matters = "10",
                Description = "爱在一起，全民来电",
                Image = "/uploadimage/jpeg5.jpg"

            };
            iActivitys.Add(act5);

            foreach (Activity a in iActivitys)
            {
                iActivityRepository.SaveOrUpdate(a);
            }

            //检查是否存在目的目录
            string filePath = System.AppDomain.CurrentDomain.BaseDirectory;
            int strLength = filePath.Length;

            if (Directory.Exists(filePath.Substring(0, strLength - 10) + @"\uploadImage\activityImage"))
            {
                if (!Directory.Exists(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage"))
                    Directory.CreateDirectory(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage");

                //先来移动文件
                DirectoryInfo info = new DirectoryInfo(filePath.Substring(0, strLength - 10) + @"\uploadImage\activityImage");
                FileInfo[] files = info.GetFiles();
                foreach (FileInfo file in files)
                {
                    File.Copy(Path.Combine(filePath.Substring(0, strLength - 10) + @"\uploadImage\activityImage", file.Name), Path.Combine(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage", file.Name), true); //复制文件
                }
            }
        }
    }
}
