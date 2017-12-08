import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';

@Component({
  selector: 'app-geometry-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements AfterViewInit {
  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private cube: THREE.Mesh;

  private renderer: THREE.WebGLRenderer;

  private scene: THREE.Scene;



  /* CUBE PROPERTIES */

  @Input()
  public size: number = 200;


  /* STAGE PROPERTIES */
  @Input()
  public cameraZ: number = 400;

  @Input()
  public fieldOfView: number = 70;

  @Input('nearClipping')
  public nearClippingPane: number = 1;

  @Input('farClipping')
  public farClippingPane: number = 1000;



  /* DEPENDENCY INJECTION (CONSTRUCTOR) */
  constructor() { }

  /**
   * Create the cube
   */
  private createCube() {
    const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    const geo = new THREE.EdgesGeometry( geometry, 1);
    const mat = new THREE.LineBasicMaterial( { color: 0x00ff00, linewidth: 2 } );
    const wireframe = new THREE.LineSegments( geo, mat );

    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper( size, divisions );
    gridHelper.position.setY(-0.5);
    this.scene.add( wireframe );
    this.scene.add( gridHelper );
  }

  /**
   * Create the scene
   */
  private createScene() {
    /* Scene */
    this.scene = new THREE.Scene();

    /* Camera */
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.z = this.cameraZ;

    const controls = new OrbitControls(this.camera, this.canvasRef.nativeElement);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    }());
  }



  /* EVENTS */

  /**
   * Update scene after resizing. 
   */
  public onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }



  /* LIFECYCLE */

  /**
   * We need to wait until template is bound to DOM, as we need the view
   * dimensions to create the scene. We could create the cube in a Init hook,
   * but we would be unable to add it to the scene until now.
   */
  public ngAfterViewInit() {
    this.createScene();
    this.createCube();
    this.startRenderingLoop();
  }
}