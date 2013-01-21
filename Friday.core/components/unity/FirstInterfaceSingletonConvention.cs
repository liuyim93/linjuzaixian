﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityConfiguration;
using Microsoft.Practices.Unity;

namespace friday.core.components
{
    public class FirstInterfaceSingletonConvention : IAssemblyScannerConvention
    {
        private bool ignoreBaseTypes;

        /// <summary>
        /// Determines whether or not to ignore interfaces on base types. Default false.
        /// </summary>
        public void IgnoreInterfacesOnBaseTypes()
        {
            ignoreBaseTypes = true;
        }

        void IAssemblyScannerConvention.Process(Type type, IUnityRegistry registry)
        {
            if (!type.IsConcrete() || !type.CanBeCreated())
                return;

            Type interfaceType = GetInterfaceType(type);

            if (interfaceType != null)
                registry.Register(interfaceType, type).Using<ContainerControlledLifetimeManager>();
        }

        private Type GetInterfaceType(Type type)
        {
            Type[] interfaces = type.GetInterfaces();
            Type interfaceType = interfaces.FirstOrDefault();

            if (!ignoreBaseTypes || type.BaseType == null)
                return interfaceType;

            foreach (Type @interface in interfaces)
            {
                if (!type.BaseType.ImplementsInterface(@interface))
                    return @interface;
            }

            return interfaceType;
        }
    }
}
