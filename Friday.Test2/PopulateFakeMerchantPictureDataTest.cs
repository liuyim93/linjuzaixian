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
    /// PopulateFakeMerchantDataTest 的摘要说明
    /// </summary>
    [TestFixture]
    public class PopulateFakeMerchantPictureDataTest
    {
        [SetUp]
        public void init()
        {

            IRepository<Merchant> iMerchantRepository = UnityHelper.UnityToT<IRepository<Merchant>>();
            IList<Merchant> iMerchants = new List<Merchant>();
            string[] mctName = { "山东大厦", "南郊宾馆", "东郊宾馆", "中豪大酒店", "贵和皇冠酒店", "银座泉城酒店", "金马丽晶大酒店", "大润发", "银座商城", "沃尔玛", "全聚德", "安泰置业", "润华置业", "明德置业", "金汉斯", "苏宁","国美" };

            for (int i = 0, j = 0; i < 13; i++, j++)
            {
                Merchant mcht = new Merchant()
                {
                    Name = mctName[j],
                    Logo = "/uploadimage/l" + i + ".png",
                    sBrand = "/uploadimage/s" + i + ".jpg",
                    bBrand = "/uploadimage/b" + i + ".jpg"
                };
                iMerchants.Add(mcht);
                iMerchantRepository.SaveOrUpdate(mcht);
            }

            //检查是否存在目的目录
            string filePath = System.AppDomain.CurrentDomain.BaseDirectory;
            int strLength = filePath.Length;

            if (Directory.Exists(filePath.Substring(0, strLength - 10) + @"\uploadImage\merchantPic"))
            {
                if (!Directory.Exists(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage"))
                    Directory.CreateDirectory(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage");

                //先来移动文件
                DirectoryInfo info = new DirectoryInfo(filePath.Substring(0, strLength - 10) + @"\uploadImage\merchantPic");
                FileInfo[] files = info.GetFiles();
                foreach (FileInfo file in files)
                {
                    File.Copy(Path.Combine(filePath.Substring(0, strLength - 10) + @"\uploadImage\merchantPic", file.Name), Path.Combine(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage", file.Name), true); //复制文件
                }
            }
        }
    }
}
