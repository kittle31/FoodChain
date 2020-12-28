package fc.square;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface SquareRepository extends CrudRepository<SquareEntity, Long>{

  List<SquareEntity> findAll();
  List<SquareEntity> findAllByXcBetween(Integer xc, Integer yc);
}
