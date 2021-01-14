package fc.square;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  @GetMapping("/area/{x1}/{y1}/{x2}/{y2}")
  public List<SquareEntity> getArea(
    @PathVariable Integer x1, @PathVariable Integer y1,
    @PathVariable Integer x2, @PathVariable Integer y2){
      List<SquareEntity> squares = squareRepo.findSquare(x1, y1, x2, y2);
      return squares;
  }
}
