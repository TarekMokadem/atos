package com.atos.task;

//import com.atos.task.model.Employee;
//import com.atos.task.repository.EmployeeRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.NoSuchElementException;

@SpringBootApplication
public class TaskApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().directory("./task-service").ignoreIfMissing().load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        SpringApplication.run(TaskApplication.class, args);
    }
/*
    @Bean
    CommandLineRunner runner(EmployeeRepository employeeRepository){
        return args -> {
            Employee employee = new Employee();
            employee.setNom("sa3id");

            employeeRepository.save(employee);
            Employee saved = employeeRepository.findById(employee.getId()).orElseThrow(NoSuchElementException::new);
        };
    }*/

}
