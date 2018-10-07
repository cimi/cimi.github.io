import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { configuration } from "./menu";

export const renderTriangle = () => {
  const scene = new THREE.Scene();

  const position = (base, offset) => ({
    x: (base.x || 0) + (offset.x || 0),
    y: (base.y || 0) + (offset.y || 0),
    z: (base.z || 0) + (offset.z || 0)
  });

  const makePerspectiveCamera = () => {
    const perspectiveCamera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    perspectiveCamera.position.set(25, 25, 25);
    perspectiveCamera.rotation.set(-Math.PI / 4, 0, 0);
    return perspectiveCamera;
  };

  const makeOrthographicCamera = () => {
    const orthographicCamera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      5000
    );
    orthographicCamera.position.set(30, 30, 30);
    orthographicCamera.lookAt(new THREE.Vector3(5, 5, 5));
    orthographicCamera.zoom = 30;
    orthographicCamera.rotation.z = Math.PI;
    orthographicCamera.updateProjectionMatrix();

    return orthographicCamera;
  };

  const makeRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffff9d, 1);
    document.body.appendChild(renderer.domElement);
    return renderer;
  };

  const addLights = () => {
    var lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(200, 0, 100);
    lights.forEach(light => scene.add(light));
  };

  const phongMaterial = color => {
    return new THREE.MeshPhongMaterial(
      Object.assign(
        { emissive: 0x072534, side: THREE.DoubleSide, flatShading: true },
        { color }
      )
    );
  };

  const addBeams = () => {
    const coloredMesh = (geometry, colors) => {
      var cubeMaterialArray = [];

      // order to add materials: x+,x-,y+,y-,z+,z-
      cubeMaterialArray.push(phongMaterial(colors[0]));
      cubeMaterialArray.push(phongMaterial(colors[0]));
      cubeMaterialArray.push(phongMaterial(colors[1]));
      cubeMaterialArray.push(phongMaterial(colors[1]));
      cubeMaterialArray.push(phongMaterial(colors[2]));
      cubeMaterialArray.push(phongMaterial(colors[2]));
      return new THREE.Mesh(geometry, cubeMaterialArray);
    };

    const makeGroup = (size, position, colors) => {
      var data = {
        ...size,
        ...position,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1
      };
      var group = new THREE.Group();
      var geometry = new THREE.BoxGeometry(
        data.width,
        data.height,
        data.depth,
        data.widthSegments,
        data.heightSegments,
        data.depthSegments
      );
      group.add(coloredMesh(geometry, colors));
      group.position.set(data.x, data.y, data.z);
      return group;
    };
    const groups = [
      makeGroup({ width: 1, height: 1, depth: 16 }, origin, colors),
      makeGroup(
        { width: 1, height: 14, depth: 1 },
        position(origin, { y: 7.5, z: 7.5 }),
        colors
      ),
      makeGroup(
        { width: 16, height: 1, depth: 1 },
        position(origin, { x: -7.5, z: -7.5 }),
        colors
      )
    ];

    groups.forEach(group => scene.add(group));
  };

  const addCorrectingTiles = () => {
    const makeTile = ({ x, y, z }, color) => {
      const geometry = new THREE.PlaneGeometry(1, 1, 1);
      const mat = phongMaterial(color);

      // var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
      // scene.add( new THREE.LineSegments( geometry, lineMaterial ) );

      const plane = new THREE.Mesh(geometry, mat);
      plane.position.set(x, y, z);
      return plane;
    };
    scene.add(makeTile(position(origin, { x: 1, y: 15, z: 8 }), colors[2]));
    scene.add(makeTile(position(origin, { y: 15, z: 8 }), colors[2]));
  };

  // const addGrid = () => {
  //   var grid = new THREE.GridHelper(100, 100);
  //   scene.add(grid);
  // };

  // const random = (upper, lower = 0) =>
  //   Math.floor(Math.random() * upper) + lower;
  const isTilted = camera =>
    Math.abs(Math.sin(camera.rotation.z)) > 0.015 &&
    Math.abs(Math.cos(camera.rotation.z)) > 0.015;

  const origin = { x: 3.5, y: 0, z: 0 };
  const colors = [0xff6138, 0x00a388, 0x0f0f0f];

  let perspectiveCamera = makePerspectiveCamera();
  let orthographicCamera = makeOrthographicCamera();

  let camera = orthographicCamera;
  let renderer = makeRenderer();
  let orbit;
  addLights();
  addBeams();
  addCorrectingTiles();
  var render = function() {
    requestAnimationFrame(render);
    camera = configuration.perspectiveCamera
      ? perspectiveCamera
      : orthographicCamera;
    if (camera.isPerspectiveCamera) {
      if (!orbit) {
        orbit = new OrbitControls(camera, renderer.domElement);
        orbit.enableZoom = false;
      }
    }
    if (camera.isOrthographicCamera && isTilted(camera)) {
      camera.rotation.z += 0.025;
    }

    renderer.render(scene, camera);
  };

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) {
      while (camera.isOrthographicCamera && !isTilted(camera)) {
        camera.rotation.z += 0.025;
        camera.updateProjectionMatrix();
      }
    }
    if (event.keyCode === 13) {
      configuration.perspectiveCamera = !configuration.perspectiveCamera;
    }
  });

  window.addEventListener(
    "resize",
    function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  render();
};
