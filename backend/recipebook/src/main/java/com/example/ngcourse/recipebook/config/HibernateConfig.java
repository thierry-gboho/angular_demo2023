package com.example.ngcourse.recipebook.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
@PropertySource("classpath:hibernate.properties")
public class HibernateConfig {

  @Value("${spring.jpa.show-sql}")
  private String HIBERNATE_SHOW_SQL;

  @Value("${spring.jpa.format-sql}")
  private String HIBERNATE_FORMAT_SQL;

  @Value("${spring.jpa.hibernate.ddl-auto}")
  private String HIBERNATE_DDL_AUTO;

  private static final String ENTITY_PACKAGES = "com.example.ngcourse.recipebook.modele.entity";

  @Autowired
  DataSource dataSource;

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory() {

    HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
    vendorAdapter.setGenerateDdl(true);

    LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
    factory.setJpaVendorAdapter(vendorAdapter);
    factory.setPackagesToScan(ENTITY_PACKAGES);
    factory.setDataSource(dataSource);
    factory.setJpaProperties(getJpaProperties());
    return factory;
  }

  @Bean("transactionManager")
  public PlatformTransactionManager jpaTransactionManager() {
    JpaTransactionManager transactionManager = new JpaTransactionManager();
    transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
    return transactionManager;
  }

  private final Properties getJpaProperties() {
    Properties hibernateProps = new Properties();

    hibernateProps.setProperty("hibernate.show_sql", HIBERNATE_SHOW_SQL);
    hibernateProps.setProperty("hibernate.format_sql", HIBERNATE_FORMAT_SQL);
    hibernateProps.setProperty("spring.jpa.hibernate.ddl-auto", HIBERNATE_DDL_AUTO);

    return hibernateProps;
  }
}
