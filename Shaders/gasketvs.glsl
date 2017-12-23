attribute vec4 vPosition;
varying vec4 vColor;

void
main()
{
	gl_PointSize = 1.0;
    vColor = vec4((1.0+vPosition.xyz)/2.0, 1.0);
    gl_Position = vPosition;
}