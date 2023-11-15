varying float vElevation;

void main(){
    vec3 color = mix(vec3(0.0,0.0,0.0), vec3(0.2,0.2,0.2), vElevation);
    gl_FragColor = vec4(color,1.0);
}