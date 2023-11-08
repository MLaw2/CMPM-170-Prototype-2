title = "Procrastinator";

description = `
Press To jump
`;

characters = [
  `
  ll
  l
 llll
l l
 l  l
l  l
`,
  `
  ll
  l
 lll
  l
  ll
 ll
`,
  `
  ll
l l  l
 llll
  l
 l lll
l   
`,
`
  rr  
 rrrr 
rrrrrr
rrrrrr
 rrrr 
  rr  
`,
];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 3,
  theme: "pixel",
  viewSize: { x: 100, y: 100 },
};

let y;
let vy;
let isJumping;
let spikes;
let spikeAddDist;
let scrolling;

function update() {
  if (!ticks) {
    y = vy = 0;
    isJumping = false;
    spikes = [];
    spikeAddDist = 0;
    scrolling = 1;
  }


  scrolling = difficulty;
  score += scrolling / 10;
  spikeAddDist -= scrolling;

  //enemy(for us is a book)
  if (spikeAddDist < 0) {

    //enemy y axis
    const y = rnd() < 1 ? (rnd() < 0.8 ? 92 : 50) : rnd(92, 50);
    //? (rnd() < 0.5 ? 8 : 92) : rnd(8, 92)
    spikes.push({ p: vec(103, y) });
    //distance
    spikeAddDist += rnd(10, 100);
  }
  color("yellow");

  spikes = spikes.filter((s) => {
    s.p.x -= scrolling;
    char("d", s.p, { rotation: floor(ticks / 10) });
    return s.p.x > -3;
  });

  if (!isJumping && input.isPressed) {
    play("powerUp");
    isJumping = true;
    vy = 4;
  }

  if (isJumping) {
    vy -= input.isPressed ? 0.1 : 0.3;
    y += vy;
    if (y < 0) {
      y = 0;
      isJumping = false;
    }
  }
  color("green");

  const c = isJumping ? "c" : addWithCharCode("a", floor(ticks / 15) % 2);
  if (
    // char(c, 50, 8 + y, { mirror: { y: -1 } }).isColliding.char.d ||
    char(c, 50, 92 - y).isColliding.char.d
  ) {
    play("explosion");
    end();
  }
  //base and color
  color("purple");
  rect(0, 0, 99, 5);
  rect(0, 95, 99, 5);
}




