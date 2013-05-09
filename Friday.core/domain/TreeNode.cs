using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public abstract class TreeNode:Entity
    {
        /// <summary>
        /// 名称
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// 是否叶节点
        /// </summary>
        public virtual bool Leaf { get; set; }

        /// <summary>
        /// 父节点ID
        /// </summary>
        public virtual string ParentID { get; set; }


        /// <summary>
        /// 节点深度
        /// </summary>
        public virtual int TLevel { get; set; }

        /// <summary>
        /// 2013-05-09 basilwang 增加family  例如字段值='1,101,10101'
        /// </summary>
        public virtual string Family
        {
            get;

            set;

        }

    }
}
