package fc.Terrain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "terraintypes")
public class TerrainTypeEntity {
    @Id
    @Column(name="terrainid")
    private Long id;

    @Column(name = "terraintypeabr")
    private String icon;

    @Column(name = "terrainname")
    private String name;
}
