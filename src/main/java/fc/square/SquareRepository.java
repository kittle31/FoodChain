package fc.square;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SquareRepository extends CrudRepository<SquareEntity, Long>{

  List<SquareEntity> findAll();
  List<SquareEntity> findAllByXcBetween(Integer xc, Integer yc);

  @Query(value ="select * from wsquare " +
                 "where xcord between ?1 and ?3 and ycord between ?2 and ?4",
  nativeQuery = true)
  List<SquareEntity> findSquare(Integer x1, Integer y1, Integer x2, Integer y2);

  List<SquareEntity> findAllByXcBetweenAndYcBetween(Integer x1, Integer y1, Integer x2, Integer y2);
}
