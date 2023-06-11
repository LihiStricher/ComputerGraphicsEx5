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

// create crossbar
const cross_bar_geometry = new THREE.CylinderGeometry(0.06, 0.06, 12.6);
const cross_bar_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cross_bar = new THREE.Mesh(cross_bar_geometry, cross_bar_material);
const m_rotation_cross = rotation_matrix('z', Math.PI / 2);
cross_bar.applyMatrix4(m_rotation_cross);
const m_trans_cross = translate_matrix(0, 1, 0 );
cross_bar.applyMatrix4(m_trans_cross);

// add crossbar to goal
goal.add(cross_bar);

// create right goal post
const right_post_geometry = new THREE.CylinderGeometry(0.06, 0.06, 3);
const right_post_geometry_meterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const right_post = new THREE.Mesh(right_post_geometry, right_post_geometry_meterial);
const m_trans_post_right = translate_matrix(6.258, -0.5, 0)
right_post.applyMatrix4(m_trans_post_right)

// create torus for the edge of the right goal post
const right_post_torus_geometry = new THREE.TorusGeometry(0.08, 0.04, 8, 16);
const right_post_torus_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const right_post_torus = new THREE.Mesh(right_post_torus_geometry, right_post_torus_material);
const m_rotation_torus_right = rotation_matrix('x', Math.PI / 2);
right_post_torus.applyMatrix4(m_rotation_torus_right);
const m_trans_torus_right = translate_matrix(6.258, -2, 0)
right_post_torus.applyMatrix4(m_trans_torus_right)

// create left goal post
const left_post_geometry = new THREE.CylinderGeometry(0.06, 0.06, 3);
const left_post_geometry_meterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const left_post = new THREE.Mesh(left_post_geometry, left_post_geometry_meterial);
const m_trans_post_left = translate_matrix(-6.258, -0.5, 0)
left_post.applyMatrix4(m_trans_post_left)

// create torus for the edge of the left goal post
const left_post_torus_geometry = new THREE.TorusGeometry(0.08, 0.04, 8, 16);
const left_post_torus_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const left_post_torus = new THREE.Mesh(left_post_torus_geometry, left_post_torus_material);
const m_rotation_torus_left = rotation_matrix('x', Math.PI / 2);
left_post_torus.applyMatrix4(m_rotation_torus_left);
const m_trans_torus_left = translate_matrix(-6.258, -2, 0)
left_post_torus.applyMatrix4(m_trans_torus_left)

// add posts to goal
goal.add(right_post,right_post_torus,left_post_torus, left_post);

// create back right support
const back_right_support_geometry = new THREE.CylinderGeometry(0.06, 0.06, 4.2);
const back_right_support_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const back_right_support = new THREE.Mesh(back_right_support_geometry, back_right_support_material);
const m_back_right_rotation = rotation_matrix('x', Math.PI / 4);
back_right_support.applyMatrix4(m_back_right_rotation);
const m_back_right_trans = translate_matrix(6.258, -0.5, -1.5);
back_right_support.applyMatrix4(m_back_right_trans)

// create torus for the edge of the back_right_support
const right_back_torus_geometry = new THREE.TorusGeometry(0.08, 0.04, 8, 16);
const right_back_torus_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const right_back_torus = new THREE.Mesh(right_back_torus_geometry, right_back_torus_material);
const m_rotation_torus_back_right = rotation_matrix('x', Math.PI / 2);
right_back_torus.applyMatrix4(m_rotation_torus_back_right);
const m_trans_torus_back_right = translate_matrix(6.258, -2, -3);
right_back_torus.applyMatrix4(m_trans_torus_back_right);

// create back left support
const back_left_support_geometry = new THREE.CylinderGeometry(0.06, 0.06, 4.2);
const back_left_support_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const back_left_support = new THREE.Mesh(back_left_support_geometry, back_left_support_material);
const m_back_left_rotation = rotation_matrix('x', Math.PI / 4);
back_left_support.applyMatrix4(m_back_left_rotation);
const m_back_left_trans = translate_matrix(-6.258, -0.5, -1.5);
back_left_support.applyMatrix4(m_back_left_trans)

// create torus for the edge of the back_right_support
const left_back_torus_geometry = new THREE.TorusGeometry(0.08, 0.04, 8, 16);
const left_back_torus_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const left_back_torus = new THREE.Mesh(left_back_torus_geometry, left_back_torus_material);
const m_rotation_torus_back_left = rotation_matrix('x', Math.PI / 2);
left_back_torus.applyMatrix4(m_rotation_torus_back_left);
const m_trans_torus_back_left = translate_matrix(-6.258, -2, -3);
left_back_torus.applyMatrix4(m_trans_torus_back_left);

// add back support
goal.add(back_right_support, right_back_torus, back_left_support, left_back_torus)

// create back net
const back_net_Geometry = new THREE.PlaneGeometry(12.6, 4.2);
const back_net_Material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide});
const back_net = new THREE.Mesh(back_net_Geometry, back_net_Material);
const m_back_Net_rotation = rotation_matrix('x', Math.PI / 4)
back_net.applyMatrix4(m_back_Net_rotation)
const m_back_Net_trans = translate_matrix(0, -0.5, -1.5)
back_net.applyMatrix4(m_back_Net_trans)

// create right side net
const right_triangle_geometry = new THREE.BufferGeometry();
const right_triangle_vertices = new Float32Array([
	1, 1, 0,  // Vertex 1
	-2, -2, 0, // Vertex 2
	1, -2, 0   // Vertex 3
]);
right_triangle_geometry.setAttribute('position', new THREE.BufferAttribute(right_triangle_vertices, 3));
const right_material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3 ,side: THREE.DoubleSide});
const right_triangle = new THREE.Mesh(right_triangle_geometry, right_material);
const m_rotation_triangle_right = rotation_matrix('y', -Math.PI / 2);
right_triangle.applyMatrix4(m_rotation_triangle_right);
const m_trans_triangle_right = translate_matrix(6.258, 0, -1);
right_triangle.applyMatrix4(m_trans_triangle_right);

// create left side net
const left_triangle_geometry = new THREE.BufferGeometry();
const left_triangle_vertices = new Float32Array([
	1, 1, 0,  // Vertex 1
	-2, -2, 0, // Vertex 2
	1, -2, 0   // Vertex 3
]);
left_triangle_geometry.setAttribute('position', new THREE.BufferAttribute(left_triangle_vertices, 3));
const left_material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3 ,side: THREE.DoubleSide,});
const left_triangle = new THREE.Mesh(left_triangle_geometry, left_material);
const m_rotation_triangle_left = rotation_matrix('y', -Math.PI / 2);
left_triangle.applyMatrix4(m_rotation_triangle_left);
const m_trans_triangle_left = translate_matrix(-6.258, 0, -1);
left_triangle.applyMatrix4(m_trans_triangle_left);

goal.add(back_net, right_triangle, left_triangle);

// create ball
const ballGeometry = new THREE.SphereGeometry(3/16, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({
	color: 0x000000, wireframe: false,});
const ball = new THREE.Mesh( ballGeometry, ballMaterial );
const m_ball_trans = translate_matrix(0, -1, 2)
ball.applyMatrix4(m_ball_trans)

// add goal to scene
scene.add(goal)
scene.add(ball);

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
let speedFactor = Math.PI / 64;
let scaleFactor = 0.95;

const toggleOrbit = (e) => {
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