import { loadGLTF } from "./libs/loader.js";

const buttonStart = document.getElementById('startButton');
const buttonStop = document.getElementById('stopButton');
buttonStop.style.display = 'none';

const THREE = window.MINDAR.IMAGE.THREE;

const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.body,
  imageTargetSrc: './assets/targets/furn-target.mind',
  uiScanning: '#scanning',
  uiLoading: 'no'
});

function startMindAR() {
  const start = async () => {
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const furnModel = await loadGLTF('./assets/models/chair/scene.gltf');
    furnModel.scene.scale.set(0.1, 0.1, 0.1);
    furnModel.scene.position.set(0, -0.4, 0);

    const furnModelAnchor = mindarThree.addAnchor(0);
    furnModelAnchor.group.add(furnModel.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    const rangeInput = document.getElementById('sizeRange');
    rangeInput.addEventListener('input', () => {
      const scaleValue = rangeInput.value;
      furnModel.scene.scale.set(scaleValue, scaleValue, scaleValue);
    });
  }
  start();
}

document.addEventListener('DOMContentLoaded', () => {
  buttonStart.addEventListener('click', () => {
    startMindAR();
    buttonStart.style.display = 'none';
    buttonStop.style.display = 'block';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  buttonStop.addEventListener('click', () => {
    mindarThree.stop();
    console.log('click');
    buttonStop.style.display = 'none';
    buttonStart.style.display = 'block';
  });
});
