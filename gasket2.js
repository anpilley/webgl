"use strict";

var gl;
var points;
const numPoints = 5000;

function render()
{
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  gl.drawArrays(gl.POINTS, 0, points.length);
};

window.onload = function init()
{
  var canvas = document.getElementById("gl-canvas");
  
  gl = WebGLUtils.setupWebGL(canvas);
  if(!gl)
  {
    alert("WebGL isn't available");
  }
  
  // set up vertex data.
  var vertices = [
    vec3(-0.5, -0.5, -0.5),
    vec3(0.5, -0.5, -0.5),
    vec3(0.0, 0.5, 0.0),
    vec3(0.0, -0.5, 0.5)
    ];

  points = [ vec3(0.0, 0.0, 0.0) ];

  for(var i = 0; points.length < numPoints; ++i)
  {
    var j = Math.floor(Math.random() * 4);

    points.push(mix(points[i], vertices[j], 0.5));
  }
  
  // configure WebGL.
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0,);
  gl.enable(gl.DEPTH_TEST);

  // load shaders
  
  var program = initShaders(gl, "Shaders/gasketvs.glsl", "Shaders/gasketfs.glsl");
  gl.useProgram(program);
  
  // load data into the GPU
  
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
  
  // associate out shader variables with our data buffer
  
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  
  render();
};
