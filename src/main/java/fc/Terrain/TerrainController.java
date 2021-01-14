package fc.Terrain;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/terrain")
@AllArgsConstructor
public class TerrainController {
    private TerrainTypeRepository terrainTypeRepository;

    @GetMapping("/types")
    public List<TerrainTypeEntity> types(){
         return terrainTypeRepository.findAll();
    }
}
