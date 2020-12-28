package fc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.AllArgsConstructor;

@SpringBootApplication()
@AllArgsConstructor
public class Application implements WebMvcConfigurer {

  public static final Logger logger = LoggerFactory.getLogger("fc");

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

}
