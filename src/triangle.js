import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

export const renderTriangle = () => {
  const scene = new THREE.Scene();

  const makeCamera = () => {
    const perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );
    perspectiveCamera.position.set(5, 10, 30);
    perspectiveCamera.rotation.set(-Math.PI / 4, 0, 0);

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

  const makeRenderer = camera => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffff9d, 1);
    document.body.appendChild(renderer.domElement);

    if (camera.isPerspectiveCamera) {
      var orbit = new OrbitControls(camera, renderer.domElement);
      orbit.enableZoom = false;
    }
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
      // Create an array of materials to be used in a cube, one for each side
      var cubeMaterialArray = [];

      // order to add materials: x+,x-,y+,y-,z+,z-
      cubeMaterialArray.push(phongMaterial(colors[0]));
      cubeMaterialArray.push(phongMaterial(colors[0]));
      cubeMaterialArray.push(phongMaterial(colors[1]));
      cubeMaterialArray.push(phongMaterial(colors[1]));
      cubeMaterialArray.push(phongMaterial(colors[2]));
      cubeMaterialArray.push(phongMaterial(colors[2]));

      var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);

      // using THREE.MeshFaceMaterial() in the constructor below
      //   causes the mesh to use the materials stored in the geometry
      return new THREE.Mesh(geometry, cubeMaterials);
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
        Object.assign({}, origin, { y: origin.y + 7.5, z: origin.z + 7.5 }),
        colors
      ),
      makeGroup(
        { width: 16, height: 1, depth: 1 },
        Object.assign({}, origin, {
          x: origin.x - 7.5,
          y: 0,
          z: origin.z - 7.5
        }),
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
    scene.add(
      makeTile(
        { x: origin.x + 1, y: origin.y + 15, z: origin.z + 8 },
        colors[2]
      )
    );
    scene.add(
      makeTile({ x: origin.x, y: origin.y + 15, z: origin.z + 8 }, colors[2])
    );
  };

  const addGrid = () => {
    var grid = new THREE.GridHelper(100, 100);
    // grid.geometry.rotateX( Math.PI / 2 );

    // var vector = new THREE.Vector3( 1, 1, 1 );
    // grid.lookAt( vector );

    // scene.add( grid );

    // var grid = new THREE.GridHelper( 100, 100 );
    scene.add(grid);
  };

  const random = (upper, lower = 0) =>
    Math.floor(Math.random() * upper) + lower;
  const isTilted = camera =>
    Math.abs(Math.sin(camera.rotation.z)) > 0.015 &&
    Math.abs(Math.cos(camera.rotation.z)) > 0.015;

  const origin = { x: 3.5, y: 0, z: 0 };
  const colors = [0xff6138, 0x00a388, 0x000000];
  const camera = makeCamera();
  const renderer = makeRenderer(camera);
  scene.add(camera);
  addLights();
  addBeams();
  addCorrectingTiles();
  var render = function() {
    requestAnimationFrame(render);

    if (isTilted(camera)) {
      camera.rotation.z += 0.025;
    }

    renderer.render(scene, camera);
  };

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) {
      while (!isTilted(camera)) {
        camera.rotation.z += 0.025;
        camera.updateProjectionMatrix();
      }
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
