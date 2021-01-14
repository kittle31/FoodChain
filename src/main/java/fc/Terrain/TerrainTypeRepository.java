package fc.Terrain;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TerrainTypeRepository extends CrudRepository<TerrainTypeEntity, Long> {
    List<TerrainTypeEntity> findAll();
}
