// Obstacles class is based off Nathan Altice's Paddle Parkour's Barrier class
class Obstacles extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {  
        // call Phaser Physics Sprite constructor
        //super(scene, game.config.width + obstacleWidth, Phaser.Math.Between(obstacleHeight/2, game.config.height - obstacleHeight/2), 'obstacle');
        super(scene, game.config.width + obstacleWidth, Math.random() > .5 ? -150 : game.config.height - obstacleHeight, 'blueGemClear');

        // set up physics sprite
        scene.add.existing(this).setOrigin(0,0);          // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);                // add physics body
        this.body.setSize(25);                           // adjust bounding box
        this.setVelocityX(velocity);                     // make it go!
        this.setImmovable();
        this.newObstacle = true;                        // custom property to control obstacle spawning
        this.scaleX = 1.5;
  
        this.scene = scene;
        this.velocity = velocity;

        // have  gems pointing up/down depending where they are
        if(this.y > game.config.height/2) {
            //points up
            //this.texture.key = 'upGem';
            //control height of obstacle
            this.scaleY = Math.floor(Math.random() * (12 - 8)) + 8;
        }
        else {
            // points down
            this.texture.key = 'downGem';
            // control height of obstacle
            this.scaleY = Math.floor(Math.random() * (9 - 7)) + 7;    
        }


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