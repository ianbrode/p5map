export default function sketch(p) {
  let bg;
  let cell = 47;
  let _x = 0;
  let _y = 0;
  let warFog = [];
  let chars = [];
  let enemy = [];
  let item = "charDeletion";
  let regimes = [
    "removeFog",
    "fog",
    "charCreation",
    "charDeletion",
    "enemyCreation",
    "enemyDeletion"
  ];
  let offset = [0, 0];
  const alp = "abcdefghijklmnopqrstuvwxyz";

  p.setup = function() {
    bg = p.loadImage("https://i.imgur.com/YgDRytg.png");
    p.createCanvas(900, 600);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.offset){
        offset = props.offset;
    }
  };

  p.draw = function() {
    p.background(220, 141, 155)
    p.image(bg, offset[0], offset[1]);

    drawFog();
    drawCell();
    drawMapLabels();

    drawChars();
    drawEnemy();

    if (item === "charCreation") {
      p.ellipse(p.mouseX, p.mouseY, cell);
    }

    if (item === "enemyCreation") {
      p.fill("red");
      p.ellipse(p.mouseX, p.mouseY, cell);
    }

    if (item === "fog") {
        p.fill("black");
        p.ellipse(p.mouseX, p.mouseY, cell * 2);
      }
  };

  p.mouseClicked = function() {
    if (item === "fog") {
        warFog.push([p.mouseX - offset[0], p.mouseY - offset[1]]);
      }

    if (item === "charCreation") {
      chars.push([p.mouseX, p.mouseY]);
    }

    if (item === "charDeletion") {
      chars = chars.filter(e => !charClicked(e, cell));
    }

    if (item === "enemyCreation") {
      if (!enemy) {
        enemy = [];
      }
      enemy.push([p.mouseX, p.mouseY]);
    }

    if (item === "enemyDeletion") {
      enemy = enemy.filter(e => !charClicked(e, cell));
    }

    if (item === "removeFog") {
      warFog = warFog.filter(e => !charClicked(e, cell * 2));
    }
  };

  function charClicked(e, r) {
    const [x0, y0] = e;
    const x1 = p.mouseX;
    const y1 = p.mouseY;

    return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < r;
  }

  function drawCell() {
    // CELLS

    for (let x = offset[0]; x < p.width; x += cell) {
      for (let y = offset[1]; y < p.height; y += cell) {
        p.stroke(51);
        p.strokeWeight(1);
        p.line(x, 0, x, p.height);
        p.line(0, y, p.width, y);
      }
    }
  }

  function drawFog() {
    // WARFOG
    p.fill("black");

    warFog.forEach(e => {
      p.ellipse(e[0] + offset[0], e[1] + offset[1], cell * 2);
    });
  }

  function drawChars() {
    chars.forEach((e, i) => {
      p.fill("rgba(0,0,0, 0.25)");
      p.ellipse(e[0], e[1], cell);

      p.textAlign("center");
      p.textSize(32);
      p.fill(255);
      p.text(i + 1, e[0], e[1] + 10);
    });
  }

  function drawEnemy() {
    enemy &&
      enemy.forEach((e, i) => {
        p.fill("rgba(255,0,0, 0.6)");
        p.ellipse(e[0], e[1], cell);

        p.textAlign("center");
        p.textSize(32);
        p.fill(255);
        p.text(i + 1, e[0], e[1] + 10);
      });
  }

  function drawMapLabels() {
    // GRID CELLS NAME
    p.stroke(0);
    p.fill(255);
    p.textSize(12);
    p.textAlign("left");
    for (let x = offset[0]; x < p.width; x += cell) {
      p.text(Math.round(x / cell), x + cell / 2, 10);
    }

    for (let y = offset[1]; y < p.height; y += cell) {
    //   p.text(Math.round(y / cell), 10, y);
        const t = Math.round(y / cell);

        p.text(alp[t % (alp.length + 1)], 5, y + cell / 2)
    }
  }

  p.keyPressed = function(key) {
    if (p.key === "a") {
      _x = _x - 1;
    }
    if (p.key === "d") {
      _x = _x + 1;
    }
    if (p.key === "w") {
      _y = _y - 1;
    }
    if (p.key === "s") {
      _y = _y + 1;
    }
    if (p.key === "q") {
      cell = cell + 1;
    }
    if (p.key === "e") {
      cell = cell - 1;
    }

    if (p.key === "p") {
      localStorage.setItem(
        "map",
        JSON.stringify({
          warFog,
          cell,
          _x,
          _y,
          item,
          chars,
          enemy,
          offset
        })
      );
    }

    if (p.key === "l") {
      const s = JSON.parse(localStorage.getItem("map"));

      warFog = s.warFog;
      cell = s.cell;
      _x = s._x;
      _y = s._y;
      item = s.item;
      chars = s.chars;
      enemy = s.enemy;
      offset = s.offset;
    }

    if (p.key === "c") {
      changeItem();
    }

    console.log(_x, _y, cell, key, p.key);
  };

  function changeItem() {
    let _i = regimes.lastIndexOf(item);

    _i = _i + 1;

    if (_i > regimes.length - 1) {
      _i = 0;
    }

    item = regimes[_i];

    console.log(item);
  }
}
