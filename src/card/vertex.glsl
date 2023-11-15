
uniform float uScroll;
varying vec2 vUv;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    float scroll = uScroll *2.5;
    
    modelPosition.z += -(min(modelPosition.y, -scroll-1.1)+scroll+1.1) *4.0;
    modelPosition.x -= (max(uScroll, 1.15)-1.15) * -cos(abs(modelPosition.y +2.75)*2.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv; 
}