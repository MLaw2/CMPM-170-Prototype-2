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

let y1;
let y2;
let vy;
let isJumping;
let spikes;
let spikeAddDist1;
let spikeAddDist2;
let scrolling;
let jumptimes;

function update() {
  if (!ticks) {
    y1 = y2 = vy = 0;
    isJumping = false;
    spikes = [];
    spikeAddDist1 = 0;
    spikeAddDist2 = 15;
    scrolling = 1;
    jumptimes = 0;
  }


  scrolling = difficulty;
  score += scrolling / 10;
  spikeAddDist1 -= scrolling;
  spikeAddDist2 -= scrolling;

  //enemy(for us is a book)
  if (spikeAddDist1 < 0) {

    //enemy y axis
    const y1 = rnd() > 1 ? (rnd() < 0.8 ? 92 : 50) : rnd(92, 50);
    //? (rnd() < 0.5 ? 8 : 92) : rnd(8, 92)
    spikes.push({ p: vec(103, y1) });
    //distance
    spikeAddDist1 += rnd(10, 100);
  }

  if (spikeAddDist2 < 0) {

    //enemy y axis
    const y2 = rnd() < 1 ? (rnd() < 0.8 ? 59 : 0) : rnd(59, 0);
    //? (rnd() < 0.5 ? 8 : 92) : rnd(8, 92)
    spikes.push({ p: vec(103, y2) });
    //distance
    spikeAddDist2 += rnd(60, 100);
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
    vy = 2;
    jumptimes = 1;
  }

  //jump
  if (isJumping) {
    vy -= input.isPressed ? 0.1 : 0.3;
    y1 += vy;
    y2 += vy;
    //double jump
    // if (input.isPressed || jumptimes < 2) {
    //   play("powerUp");
    //   isJumping = true;
    //   vy = 2;
    //   jumptimes = 2;
    //   // if(jumptimes == 2)
    //   // {
    //   //   isJumping = false;
    //   // }
    // }
    if (y1 < 0 || y2 < 0) {
      y1 = 0;
      y2 = 0;
      isJumping = false;
    }
  }
  color("green");

  const c = isJumping ? "c" : addWithCharCode("a", floor(ticks / 15) % 2);
  if (
    // char(c, 50, 8 + y, { mirror: { y: -1 } }).isColliding.char.d ||
    char(c, 50, 92 - y1).isColliding.char.d 
  ) {
    play("explosion");
    end();
  }
  //base and color
  color("purple");
  rect(0, 0, 99, 5);
  rect(0, 95, 99, 5);
}





