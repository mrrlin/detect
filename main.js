import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.body,
  imageTargetSrc: './assets/targets/furn-target.mind'
});

function startMindAR() {
  const start = async () => {
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const furnModel = await loadGLTF('./assets/models/chair/scene.gltf');
    furnModel.scene.scale.set(0.1, 0.1, 0.1);
    furnModel.scene.position.set(0, -0.4, 0);

    const bear = await loadGLTF('./assets/models/chair/scene.gltf');
    bear.scene.scale.set(0.1, 0.1, 0.1);
    bear.scene.position.set(0, -0.4, 0);

    const furnModelAnchor = mindarThree.addAnchor(0);
    furnModelAnchor.group.add(furnModel.scene);

    const bearAnchor = mindarThree.addAnchor(1);
    bearAnchor.group.add(bear.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('startButton');
  button.addEventListener('click', startMindAR);
});

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('stopButton');
  button.addEventListener('click', () => {
    mindarThree.stop();
    console.log('click');
  });
});