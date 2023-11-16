import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import flaqueVertexShader from './flaque/vertex.glsl'
import flaqueFragmentShader from './flaque/fragment.glsl'
import * as dat from 'lil-gui'
import cardVertexShader from '/card/vertex.glsl'
import cardFragmentShader from '/card/fragment.glsl'


const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()




const flaqueMat = new THREE.ShaderMaterial({
    vertexShader : flaqueVertexShader,
    fragmentShader : flaqueFragmentShader,
    uniforms : {
        uTime : {value : 0},

        
    },
    

})
    const flaqueGeo = new THREE.PlaneGeometry(15,8,1024,512)

    
    const flaque = new THREE.Mesh(flaqueGeo,flaqueMat)
    flaque.position.set(0,-1.5,-1.2)
    flaque.receiveShadow = true
    scene.add(flaque)

const textureLoader = new THREE.TextureLoader()
const cardTexture = textureLoader.load('/textures/espace.jpg')
const cardGeo = new THREE.PlaneGeometry(0.75,1.5,512,1024)
console.log(cardGeo.parameters);
const cardMat = new THREE.ShaderMaterial({
    vertexShader : cardVertexShader,
    fragmentShader : cardFragmentShader,
    uniforms : {
        uTexture :{value : cardTexture},
        
        uScroll : {value : window.scrollY/window.innerHeight}
    }
})

const card = new THREE.Mesh(cardGeo,cardMat)
const card4 = new THREE.Mesh(cardGeo, cardMat)
const card2 = new THREE.Mesh(cardGeo, cardMat)
const card3 = new THREE.Mesh(cardGeo, cardMat)
const card5 = new THREE.Mesh(cardGeo, cardMat)



card4.position.set(0.95,-2.75,0)
card2.position.set(-0.95,-2.75,0)
card3.position.set(1.9,-2.75,0)
card5.position.set(-1.9,-2.75,0)

card.position.y = -2.75

scene.add(card,card2,card3, card4,card5)

const textures = ["html","css","javascript","wordpress","blender","figma", "vite", "php"]
const logoGeoTest = new THREE.PlaneGeometry(0.1,0.1,256,256)
const meshes = []
let positionX = -1.58

for(const texture of textures){
    const load = "/textures/"+texture+".webp"
    const textureLoad = textureLoader.load(load)
    const matos = new THREE.MeshBasicMaterial({
        map: textureLoad,
        transparent:true,
        side : THREE.DoubleSide
        
    })
    const mesh = new THREE.Mesh(logoGeoTest,matos)
    mesh.position.x = positionX
    mesh.position.y = -0.8
    mesh.position.z = 0
    mesh.positionXLogo = positionX
    positionX += 0.2
    mesh.rotationRandomY = Math.random()+0.5
    meshes.push(mesh)

    scene.add(mesh)

}




// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.set(0,0,3)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

const controls = new OrbitControls(camera,canvas)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock = new THREE.Clock()

//Animation 
function tick(){
    const elapsedTime = clock.getElapsedTime()

    flaqueMat.uniforms.uTime.value = elapsedTime
    //controls.update()
    for(const meshLogo of meshes){
       
        meshLogo.rotation.y = meshLogo.rotationRandomY * elapsedTime *2
    }
    
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
    
}
tick()

window.addEventListener('scroll',e=>{
    
    camera.position.y = - window.scrollY/window.innerHeight * 2.5


    cardMat.uniforms.uScroll.value = window.scrollY/window.innerHeight
    for(const meshLogoX of meshes){
        meshLogoX.position.x = meshLogoX.positionXLogo - ((window.scrollY/window.innerHeight) *15)

    }

    const pif = Math.max(window.scrollY/window.innerHeight, 1.43) -1.43
    camera.position.z = 3 - pif * (3/0.75)
    camera.rotation.x = Math.PI* pif * (0.5/0.75)

    const paf = Math.max(window.scrollY/window.innerHeight, 1.15) - 1.15
    card.position.x = 0 + paf * 15
    card2.position.x = -0.95 + paf *15
    card3.position.x = 1.9 + paf *15
    card4.position.x = 0.95 + paf *15
    card5.position.x = -1.9 + paf *15

    console.log(window.scrollY/window.innerHeight);

})