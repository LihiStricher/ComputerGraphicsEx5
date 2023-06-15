import {OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 'ForestGreen' );

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

// Add here the rendering of your goal

// translate transformation function
function translate_matrix(x, y, z){
	const m = new THREE.Matrix4();
	m.set(1, 0, 0, x,
		  0, 1, 0, y,
		  0, 0, 1, z,
		  0, 0, 0, 1);
	return m;
}

function rotation_matrix(axis, theta){
	const m = new THREE.Matrix4()
	if(axis === 'x'){
		m.set(1, 0, 0, 0,
		      0, Math.cos(theta), -Math.sin(theta), 0,
		      0, Math.sin(theta), Math.cos(theta), 0,
		      0, 0, 0, 1)
	}
	if(axis === 'y'){
		m.set(Math.cos(theta), 0, Math.sin(theta), 0,
			0, 1, 0, 0,
			-Math.sin(theta), 0, Math.cos(theta), 0,
			0, 0, 0, 1)
	}
	if(axis === 'z'){
		m.set(Math.cos(theta), -Math.sin(theta), 0, 0,
			Math.sin(theta), Math.cos(theta), 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1)
	}
	return m
}

function scale_matrix(x, y, z){
	const m = new THREE.Matrix4();
	m.set(x, 0, 0, 0,
		  0, y, 0, 0,
		  0, 0, z, 0,
		  0, 0, 0, 1);
	return m;
}

// Create the goal gate
const goal = new THREE.Group();

// from this number we will fit the whole scene
let crossbar_length = 3

// crossbar width
let crossbar_width = crossbar_length / 150

// crossbar height from origin
let height_from_origin = crossbar_length / 9

// angle for the back support rotations
let angle = Math.PI / 4

// create crossbar
const cross_bar_geometry = new THREE.CylinderGeometry(crossbar_width, crossbar_width, crossbar_length);
const cross_bar_material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const cross_bar = new THREE.Mesh(cross_bar_geometry, cross_bar_material);
const m_rotation_cross = rotation_matrix('z', Math.PI / 2);
cross_bar.applyMatrix4(m_rotation_cross);
const m_trans_cross = translate_matrix(0, height_from_origin, 0 );
cross_bar.applyMatrix4(m_trans_cross);

// add crossbar to goal
goal.add(cross_bar);

// create right goal post
const right_post_geometry = new THREE.CylinderGeometry(crossbar_width, crossbar_width, crossbar_length / 3);
const right_post_geometry_meterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const right_post = new THREE.Mesh(right_post_geometry, right_post_geometry_meterial);
const m_trans_post_right = translate_matrix(crossbar_length / 2, -height_from_origin / 2, 0)
right_post.applyMatrix4(m_trans_post_right)

// create torus for the edge of the right goal post
const right_post_torus_geometry = new THREE.TorusGeometry(crossbar_width + 0.02, crossbar_width - 0.02, (crossbar_length + 7) / 2, crossbar_length + 7);
const right_post_torus_material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const right_post_torus = new THREE.Mesh(right_post_torus_geometry, right_post_torus_material);
const m_rotation_torus_right = rotation_matrix('x', Math.PI / 2);
right_post_torus.applyMatrix4(m_rotation_torus_right);
const m_trans_torus_right = translate_matrix(crossbar_length / 2, -height_from_origin * 2, 0)
right_post_torus.applyMatrix4(m_trans_torus_right)

// create left goal post
const left_post_geometry = new THREE.CylinderGeometry(crossbar_width, crossbar_width, crossbar_length / 3);
const left_post_geometry_meterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const left_post = new THREE.Mesh(left_post_geometry, left_post_geometry_meterial);
const m_trans_post_left = translate_matrix(-crossbar_length / 2, -height_from_origin / 2, 0)
left_post.applyMatrix4(m_trans_post_left)

// create torus for the edge of the left goal post
const left_post_torus_geometry = new THREE.TorusGeometry(crossbar_width + 0.02, crossbar_width - 0.02, (crossbar_length + 7) / 2,  crossbar_length + 7);
const left_post_torus_material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const left_post_torus = new THREE.Mesh(left_post_torus_geometry, left_post_torus_material);
const m_rotation_torus_left = rotation_matrix('x', Math.PI / 2);
left_post_torus.applyMatrix4(m_rotation_torus_left);
const m_trans_torus_left = translate_matrix(-crossbar_length / 2, -height_from_origin * 2, 0)
left_post_torus.applyMatrix4(m_trans_torus_left)

// add posts to goal
goal.add(right_post,right_post_torus,left_post_torus, left_post);

// create back right support
let back_support_length = (crossbar_length / 3) / Math.cos(angle)
const back_right_support_geometry = new THREE.CylinderGeometry(crossbar_width, crossbar_width, back_support_length);
const back_right_support_material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const back_right_support = new THREE.Mesh(back_right_support_geometry, back_right_support_material);
const m_back_right_rotation = rotation_matrix('x', Math.PI / 4);
back_right_support.applyMatrix4(m_back_right_rotation);
const m_back_right_trans = translate_matrix(crossbar_length / 2, -height_from_origin / 2, -crossbar_length / 6);
back_right_support.applyMatrix4(m_back_right_trans)

// create torus for the edge of the back_right_support
const right_back_torus_geometry = new THREE.TorusGeometry(crossbar_width + 0.02, crossbar_width - 0.02, (crossbar_length + 7) / 2, crossbar_length + 7);
const right_back_torus_material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const right_back_torus = new THREE.Mesh(right_back_torus_geometry, right_back_torus_material);
const m_rotation_torus_back_right = rotation_matrix('x', Math.PI / 2);
right_back_torus.applyMatrix4(m_rotation_torus_back_right);
const m_trans_torus_back_right = translate_matrix(crossbar_length / 2, -height_from_origin * 2, -crossbar_length / 3);
right_back_torus.applyMatrix4(m_trans_torus_back_right);

// create back left support
const back_left_support_geometry = new THREE.CylinderGeometry(crossbar_width, crossbar_width, back_support_length);
const back_left_support_material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const back_left_support = new THREE.Mesh(back_left_support_geometry, back_left_support_material);
const m_back_left_rotation = rotation_matrix('x', Math.PI / 4);
back_left_support.applyMatrix4(m_back_left_rotation);
const m_back_left_trans = translate_matrix(-crossbar_length / 2, -height_from_origin / 2, -crossbar_length / 6);
back_left_support.applyMatrix4(m_back_left_trans)

// create torus for the edge of the back_right_support
const left_back_torus_geometry = new THREE.TorusGeometry(crossbar_width + 0.02, crossbar_width - 0.02, (crossbar_length + 7) / 2, crossbar_length + 7);
const left_back_torus_material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const left_back_torus = new THREE.Mesh(left_back_torus_geometry, left_back_torus_material);
const m_rotation_torus_back_left = rotation_matrix('x', Math.PI / 2);
left_back_torus.applyMatrix4(m_rotation_torus_back_left);
const m_trans_torus_back_left = translate_matrix(-crossbar_length / 2, -height_from_origin * 2, -crossbar_length / 3);
left_back_torus.applyMatrix4(m_trans_torus_back_left);

// add back support
goal.add(back_right_support, right_back_torus, back_left_support, left_back_torus)

// create back net
const back_net_Geometry = new THREE.PlaneGeometry(crossbar_length , back_support_length);
const back_net_Material = new THREE.MeshPhongMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide});
const back_net = new THREE.Mesh(back_net_Geometry, back_net_Material);
const m_back_Net_rotation = rotation_matrix('x', Math.PI / 4)
back_net.applyMatrix4(m_back_Net_rotation)
const m_back_Net_trans = translate_matrix(0, -height_from_origin / 2, -crossbar_length / 6)
back_net.applyMatrix4(m_back_Net_trans)

// create right side net
const right_triangle_Shape = new THREE.Shape();
right_triangle_Shape.lineTo(-height_from_origin * 2, -height_from_origin * 2); // Vertex 2
right_triangle_Shape.lineTo(crossbar_length / 9, -height_from_origin * 2); // Vertex 3
right_triangle_Shape.lineTo(crossbar_length / 9, crossbar_length / 9); // Vertex 1
const right_triangle_geometry = new THREE.ShapeGeometry(right_triangle_Shape);
const right_material = new THREE.MeshPhongMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide });
const right_triangle = new THREE.Mesh(right_triangle_geometry, right_material);
const m_rotation_triangle_right = rotation_matrix('y', -Math.PI / 2);
right_triangle.applyMatrix4(m_rotation_triangle_right);
const m_trans_triangle_right = translate_matrix(crossbar_length / 2, 0, -height_from_origin);
right_triangle.applyMatrix4(m_trans_triangle_right);

// create left side net
const left_triangle_Shape = new THREE.Shape();
left_triangle_Shape.lineTo(-height_from_origin * 2, -height_from_origin * 2); // Vertex 2
left_triangle_Shape.lineTo(crossbar_length / 9, -height_from_origin * 2); // Vertex 3
left_triangle_Shape.lineTo(crossbar_length / 9, crossbar_length / 9); // Vertex 1
const left_triangle_geometry = new THREE.ShapeGeometry(left_triangle_Shape);
const left_material = new THREE.MeshPhongMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide });
const left_triangle = new THREE.Mesh(left_triangle_geometry, left_material);
const m_rotation_triangle_left = rotation_matrix('y', -Math.PI / 2);
left_triangle.applyMatrix4(m_rotation_triangle_left);
const m_trans_triangle_left = translate_matrix(-crossbar_length / 2, 0, -height_from_origin);
left_triangle.applyMatrix4(m_trans_triangle_left);

goal.add(back_net, right_triangle, left_triangle);

// create ball
const ballGeometry = new THREE.SphereGeometry(((crossbar_length / 3) / 8) / 2, crossbar_length * 4, crossbar_length * 4);
const ballMaterial = new THREE.MeshPhongMaterial({
	color: 0x000000, wireframe: false,});
const ball = new THREE.Mesh( ballGeometry, ballMaterial );
const m_ball_trans = translate_matrix(0, -height_from_origin * 2 + 0.1, height_from_origin * 2)
ball.applyMatrix4(m_ball_trans)

const loader = new THREE.ImageLoader();
loader.load('goalkeeper.png', function (image) {
		const texture = new THREE.Texture(image);
		texture.needsUpdate = true;
		const material = new THREE.MeshPhongMaterial({ map: texture, transparent: true, alpha: 0.5, side : THREE.DoubleSide });
		const geometry = new THREE.PlaneGeometry(crossbar_length / 1.8, crossbar_length / 3);
		const mesh = new THREE.Mesh(geometry, material);
		const m_goalkeeper_trans = translate_matrix(0, -height_from_origin, height_from_origin / 2)
		mesh.applyMatrix4(m_goalkeeper_trans)
		mesh.name = "goalkeeper"
		scene.add(mesh);
	},
	undefined,
	function () {
		console.error('An error happened.');
	}
);

// add goal to scene
scene.add(goal)
scene.add(ball);

//add spotlight source
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.intensity = 0;
scene.add(spotLight);

// Load the font file
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
	// Create text geometry
	const textGeometry = new THREE.TextGeometry('w - wireframe\no - orbit controls' +
		'\nup/down - speed ball\n1/2 - trajectory ball\n3 - shrink goal' +
		'\nright/left - move goalkeeper', {
		font: font,
		size: crossbar_width * 3.5,
		height: 0.1,
		curveSegments: 0.8,
		bevelEnabled: true,
		bevelThickness: 1/100000,
		bevelSize: 1/100000,
		bevelOffset: 0.00001,
	});

	// Create material for the text
	const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

	// Create mesh using the text geometry and material
	const textMesh = new THREE.Mesh(textGeometry, textMaterial);


	// Set the position and rotation of the text
	const m_rotation_text = rotation_matrix('x', Math.PI / 6);
	textMesh.applyMatrix4(m_rotation_text);
	const m_trans_text = translate_matrix(-crossbar_length / 6, crossbar_length / 3, 0);
	textMesh.applyMatrix4(m_trans_text);

	// Add the text mesh to the scene
	scene.add(textMesh);
});


// This defines the initial distance of the camera
const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0,0,5);
camera.applyMatrix4(cameraTranslate)

renderer.render( scene, camera );

const controls = new OrbitControls( camera, renderer.domElement );

let isOrbitEnabled = true;
let isWireframe = false;
let isFirstRotationEnabled = false;
let isSecondRotationEnabled = false;
let scaleForGoalkeeper = 1
let speedFactor = Math.PI / 64;
let scaleFactor = 0.95;

const toggleOrbit = (e) => {
	let goalkeeper = scene.getObjectByName('goalkeeper');
	if (e.key === "o"){
		isOrbitEnabled = !isOrbitEnabled;
	}
	if(isOrbitEnabled){
		if (e.key === "w"){
			isWireframe = !isWireframe
			goal.children.forEach((object) => {
				object.material.wireframe = isWireframe});
			ballMaterial.wireframe = isWireframe;
		}
		if(e.key === "1"){
			isFirstRotationEnabled = !isFirstRotationEnabled
		}
		if(e.key === "2"){
			isSecondRotationEnabled = !isSecondRotationEnabled
		}
		if(e.key === "3"){
			const m_scale = scale_matrix(scaleFactor, scaleFactor, scaleFactor);
			goal.applyMatrix4(m_scale);
		}
		if(e.key === "ArrowUp") {
			speedFactor += Math.PI / 64;
		}
		if(e.key === "ArrowDown") {
			speedFactor -= Math.PI / 64;
		}
		if(e.key === "ArrowRight") {
			if(goalkeeper.position.x < crossbar_length / 3) {
				scaleForGoalkeeper += crossbar_length / 10000;
				const m_goalkeeper_trans = translate_matrix(scaleForGoalkeeper, 0, 0)
				goalkeeper.applyMatrix4(m_goalkeeper_trans)
			}
		}
		if(e.key === "ArrowLeft") {
			if(goalkeeper.position.x > -(crossbar_length / 3) + height_from_origin) {
				scaleForGoalkeeper -= crossbar_length / 10000;
				const m_goalkeeper_trans = translate_matrix(-scaleForGoalkeeper, 0, 0)
				goalkeeper.applyMatrix4(m_goalkeeper_trans)
			}
		}
	}
}

document.addEventListener('keydown',toggleOrbit)

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function animate() {

	requestAnimationFrame( animate );

	controls.enabled = isOrbitEnabled;

	if (isFirstRotationEnabled){
		const m_ball_rotation = rotation_matrix('x', speedFactor)
		ball.applyMatrix4(m_ball_rotation)
	}
	if (isSecondRotationEnabled){
		const m_ball_rotation = rotation_matrix('y', speedFactor)
		ball.applyMatrix4(m_ball_rotation)
	}

	controls.update();

	renderer.render( scene, camera );

}
animate()