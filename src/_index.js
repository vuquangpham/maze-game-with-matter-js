// import file style
import 'assets/style/style.css';

import Matter from 'matter-js';

const {Engine, Bodies, World, Render, Runner, MouseConstraint, Mouse} = Matter;

// create new engine
const engine = Engine.create();
// get instance of engine
const {world} = engine;

const width = 800;
const height = 600;

const render = Render.create({
    // go and render the representation the WORLD inside of body
    element: document.body,
    engine,
    options: {
        // fill for each object
        wireframes: false,
        // specify height and width of canvas
        width,
        height
    }
});

// tell to render element and render object to start working and start
// to draw all the updates of our world into the screen
Render.run(render);

// what coordinates all these changes from state A to state B of our engine
Runner.run(Runner.create(), engine);

// Add click & drag
World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));

// add simple shape
/*
// position => relative to the CENTER of rectangle
const shape = Bodies.rectangle(200, 200, 50, 50, {
    // don't want to move, by default => gravity (fall from top to bottom)
    isStatic: true
});
// add to the World object and show to the screen
World.add(world, shape);
*/

// Walls
const walls = [
    Bodies.rectangle(400, 0, 800, 40, {isStatic: true}),
    Bodies.rectangle(400, 600, 800, 40, {isStatic: true}),
    Bodies.rectangle(0, 300, 40, 800, {isStatic: true}),
    Bodies.rectangle(800, 300, 40, 800, {isStatic: true}),
];
World.add(world, walls);
const shape = Bodies.rectangle(200, 200, 50, 50);
World.add(world, shape);

// Generate Random Shapes
for(let i = 0; i < 100; i++){
    if(Math.random() > 0.5){
        World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
    }else{
        World.add(world, Bodies.circle(Math.random() * width, Math.random() * height, 35, {
            // customize how this circle gets rendered
            render: {
                fillStyle: 'red'
            }
        }));
    }
}