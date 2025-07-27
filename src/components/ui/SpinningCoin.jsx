import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import logoImg from "../../assets/Images/jpg/esummitlogoRotated.png";
import logoBackImg from "../../assets/Images/jpg/icamplogoRotated.png";

const SpinningCoin = () => {
  const mountRef = useRef(null);

  

  useEffect(() => {
  const width = mountRef.current.clientWidth;
  const height = mountRef.current.clientHeight;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 0.65); // Closer — adjust as needed

  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  mountRef.current.appendChild(renderer.domElement);

  // Main directional light casting shadow
  const dirLight = new THREE.DirectionalLight(0xffffff, 2);
  dirLight.position.set(2, 5, 5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 20;
  scene.add(dirLight);

  // Ambient light for general illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Brighter ambient
  scene.add(ambientLight);

  // Plane to receive shadow
  const planeGeometry = new THREE.PlaneGeometry(5, 5);
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.4 });
  const shadowPlane = new THREE.Mesh(planeGeometry, shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -0.15;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // Load textures
  const loader = new THREE.TextureLoader();
  const texture1 = loader.load(logoImg);
  const texture2 = loader.load(logoBackImg);
  texture1.center.set(0.5, 0.5);
  texture2.center.set(0.5, 0.5);

  const frontMat = new THREE.MeshStandardMaterial({ map: texture1, side: THREE.DoubleSide });
  const backMat = new THREE.MeshStandardMaterial({ map: texture2, side: THREE.DoubleSide });
  const sideMat = new THREE.MeshStandardMaterial({ color: "white" });

  const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.07, 64, 1, false);
  geometry.clearGroups();
  geometry.addGroup(0, 64 * 6, 0);       // side
  geometry.addGroup(64 * 6, 64 * 3, 2);  // top face (back image)
  geometry.addGroup(64 * 9, 64 * 3, 1);  // bottom face (front image)

  const materials = [sideMat, frontMat, backMat];
  const coin = new THREE.Mesh(geometry, materials);
  coin.rotation.x = Math.PI / 2;
  coin.castShadow = true;
  scene.add(coin);

  // Animation
  const clock = new THREE.Clock();
  const holdTime = 1;
  const rotateTime = 2;
  const cycleTime = 2 * (holdTime + rotateTime);

  const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

  const animate = () => {
    const t = clock.getElapsedTime() % cycleTime;

    let angle;
    if (t < holdTime) {
      angle = 0;
    } else if (t < holdTime + rotateTime) {
      const p = (t - holdTime) / rotateTime;
      angle = easeInOutSine(p) * Math.PI;
    } else if (t < holdTime + rotateTime + holdTime) {
      angle = Math.PI;
    } else {
      const p = (t - (2 * holdTime + rotateTime)) / rotateTime;
      angle = Math.PI + easeInOutSine(p) * Math.PI;
    }

    coin.rotation.z = angle;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  const handleResize = () => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    if (mountRef.current && renderer.domElement) {
      mountRef.current.removeChild(renderer.domElement);
    }
  };
}, []);


  return (
    <div
      ref={mountRef}
      className="w-[80px] h-[80px] sm:w-[12%] sm:h-[12%] flex justify-center items-center"

    />
  );
};

export default SpinningCoin;
