//React imports
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
//My imports
import "./AboutUsPage.css";
import NightSky from "../../../assets/NightSky8K.jpg";

const LandscapePage = () => {
  const mountRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current || initializedRef.current) return;
    initializedRef.current = true;

    // Create scene with dark blue background and fog for a deep night atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d2b);
    scene.fog = new THREE.FogExp2(0x0d0d2b, 0.0008);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 30);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.3; //Lower exposure for darker scene
    renderer.outputEncoding = THREE.sRGBEncoding;

    mountRef.current.appendChild(renderer.domElement);

    //Lighting: Dim ambient light for overall darkness
    const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
    scene.add(ambientLight);

    //Dim directional "moon" light with bluish tint for highlights
    const moonLight = new THREE.DirectionalLight(0x99ccff, 0.3);
    moonLight.position.set(20, 50, -10);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 2048;
    moonLight.shadow.mapSize.height = 2048;
    scene.add(moonLight);

    //Sky dome using the NightSky8K.jpg image
    const textureLoader = new THREE.TextureLoader();
    const skyTexture = textureLoader.load(NightSky);
    skyTexture.encoding = THREE.sRGBEncoding;

    const skyGeometry = new THREE.SphereGeometry(500, 60, 40);
    skyGeometry.scale(-1, 1, 1);

    const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture });
    const skyDome = new THREE.Mesh(skyGeometry, skyMaterial);
    
    scene.add(skyDome);

    //Set up OrbitControls for smooth rotation (no pan/zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;
    //Limit vertical rotation
    controls.minPolarAngle = Math.PI / 5;
    controls.maxPolarAngle = Math.PI / 1.3;

    //Post-processing: Use EffectComposer to add subtle bloom effect
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3, //Lower strength for subtle bloom
      0.4,
      0.9  //Higher threshold so only the very brightest parts glow
    );
    composer.addPass(bloomPass);

    //Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
    };
    animate();

    return () => {
      if(mountRef.current)
        mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div className="landscape-page" ref={mountRef}></div>;
};

export default LandscapePage;
