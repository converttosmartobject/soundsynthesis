'use strict';

let osc;
let waveFormSelect;
let pNoise;
let music;
let amplitude;
let volHistory = [];

function preload(){
  music = loadSound('audio2.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

osc = new p5.Oscillator('square');
amplitude = new p5.Amplitude();


createSpan('Select waveform: ')
waveFormSelect = createSelect();
  waveFormSelect.option('sine');
  waveFormSelect.option('triangle');
  waveFormSelect.option('square');
  waveFormSelect.option('sawtooth');
  waveFormSelect.changed(setWaveForm);

//osc.setType('');

}

function draw() {
  background(0);

  let level = amplitude.getLevel();

  pNoise = noise(frameCount / 20) * 100;

  osc.freq(map(mouseX, 0, width, 60, 1200) + pNoise);

  osc.amp(map(sin(frameCount / 20), -1, 1, 0.05, .2));
  // osc.amp(map(mouseY, 0, height, 0.2, 0));

  volHistory.push(level);
noFill();
stroke(0,255,0);
beginShape();

  for (let i = 0; i < volHistory.length; i++){
    let y = map(volHistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
endShape();
stroke(252, 3, 244);
  ellipse(100, 100, level * 1000, level * 1000);

  if (volHistory.length > width - 50){
    volHistory.splice(0,1);
  }

stroke(0, 225, 255);
line(volHistory.length, 0, volHistory.length, height);

}

function setWaveForm(){
  osc.setType(waveFormSelect.value());
}

function mousePressed(){
  osc.start();
  music.play();

}

function mouseReleased(){
  osc.stop();
  music.stop();

}
