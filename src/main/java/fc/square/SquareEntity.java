package fc.square;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "wsquare")
@AllArgsConstructor
@NoArgsConstructor
public class SquareEntity {
  @Id
  @Column(name="squareid")
  private Long id;

  @Column(name="xcord")
  private Integer xc;

  @Column(name="ycord")
  private Integer yc;

  @Column(name="elevation")
  private Long elev;

  @Column(name="terraintype")
  private String terrainType;
}
