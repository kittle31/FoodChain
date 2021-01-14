package fc.square;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.persistence.Table;

@Data
@Table(name = "terraintypes")
public class TerrainTypeEntity {
    @Id
    @Column(name="terrainid")
    private Long id;
    @Column(name = "")
    private
}
