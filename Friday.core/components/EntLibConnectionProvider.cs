using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using NHibernate;
using NHibernate.Connection;
using NHibernate.Driver;
using NHibernate.Util;
using Environment = NHibernate.Cfg.Environment;

namespace friday.core.components
{
    public class EntLibConnectionProvider : IConnectionProvider
    {
        private IDriver driver;

        public void CloseConnection(IDbConnection conn)
        {
            try
            {
                conn.Close();
                conn.Dispose();
            }
            catch (Exception e)
            {
                throw new ADOException("Could not close " + conn.GetType() + " connection", e);
            }
        }

        public void Configure(IDictionary<string, string> settings)
        {
            // Ripped from ConnectionProvider.ConfigureDriver()
            ConfigureDriver(settings);
        }

        /// <summary>
        /// Configures the driver for the ConnectionProvider.
        /// </summary>
        /// <param name="settings">An <see cref="IDictionary"/> that contains the settings for the Driver.</param>
        /// <exception cref="HibernateException">
        /// Thrown when the <see cref="NHibernate.Cfg.Environment.ConnectionDriver"/> could not be 
        /// found in the <c>settings</c> parameter or there is a problem with creating
        /// the <see cref="IDriver"/>.
        /// </exception>
        protected virtual void ConfigureDriver(IDictionary<string, string> settings)
        {
            string driverClass;
            if (!settings.TryGetValue(Environment.ConnectionDriver, out driverClass))
            {
                throw new HibernateException("The " + Environment.ConnectionDriver +
                                             " must be specified in the NHibernate configuration section.");
            }
            else
            {
                try
                {
                    driver =
                        (IDriver)Environment.BytecodeProvider.ObjectsFactory.CreateInstance(ReflectHelper.ClassForName(driverClass));
                    driver.Configure(settings);
                }
                catch (Exception e)
                {
                    throw new HibernateException("Could not create the driver from " + driverClass + ".", e);
                }
            }
        }

        public IDriver Driver
        {
            get { return this.driver; }
        }

        public IDbConnection GetConnection()
        {
            var database = DatabaseFactory.CreateDatabase();
            IDbConnection conn = database.CreateConnection();

            try
            {
                conn.Open();
            }
            catch (Exception)
            {
                conn.Dispose();
                throw;
            }

            return conn;
        }

        public void Dispose() { }
    }
}
