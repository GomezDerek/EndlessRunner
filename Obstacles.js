class Obstacles extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        //call Phaser Physics Sprite constructor
        //super(scene, game.config.width + obstacleWidth, Phaser.Math.Between(obstacleHeight/2, game.config.height - obstacleHeight/2), 'obstacle');
        super(scene, game.config.width + obstacleWidth, Math.random() > .67 ? obstacleHeight/2 - 30 : game.config.height - obstacleHeight/2 + 70, 'blueGemClear');

        //set up physics sprite
        scene.add.existing(this).setOrigin(0,0);          // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);  // add physics body
        this.setVelocityX(velocity);       // make it go!
        this.setImmovable();
        this.newObstacle = true;           // custom property to control obstacle spawning
  
        this.scene = scene;
        this.velocity = velocity;

        //have  gems pointing up/down depending where they are
        if(this.y > game.config.height/2) {
            //this.texture.key = 'upGem';
            this.scaleY = Math.floor(Math.random() * (7 - 4)) + 4;
            //this.scaleY = Math.floor(Math.random() * (2-1) + 2);
        }
        else {
            //this.texture.key = 'downGem';
            this.scaleY = Math.floor(Math.random() * (9 - 6)) + 6;           
            //this.scaleY = Math.floor(Math.random() * (2-1) + 2);
        }

        //this.scaleY = 6;
    }

    update() {
        //override physics sprite update()
        super.update();

        //add new obstacle when existing obstacle hits center X
        if(this.newObstacle && this.x < centerX) {
            this.newObstacle = false;
            //call parent scene method from this context
            this.scene.addObstacle(this.parent, this.velocity);
        }

        //destroy obstacle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }

    }
}