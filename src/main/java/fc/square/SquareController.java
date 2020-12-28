package fc.square;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/square")
@AllArgsConstructor
public class SquareController {

  private SquareRepository squareRepo;

  @GetMapping("/all")
  public List<SquareEntity>  getSquares(){
      return squareRepo.findAllByXcBetween(5, 10);
  }
}
