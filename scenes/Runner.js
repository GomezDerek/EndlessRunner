// This class is based off of Nathan Altice's Movement Studies's Runner class
class Runner extends Phaser.Scene {
    constructor() {
        super("runnerScene");
    }

    preload() {
        //crash sound 
        this.load.audio('crashSound', './assets/explosion38.wav');
    }

    create() {
       //play music
       //music = this.sound.add('playMusic');
       //music.play( {loop:true} );
       //  console.log(this);
       // console.log(crashSound);
       //  let crash = this.sound.add('crashSound');
       // crash.play( {loop:true} );
     
       
        // variables and settings
        this.JUMP_VELOCITY = -500;
        this.GLIDE_VELOCITY = 0;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;

        this.obstacleSpeed = -250;
        this.ObstacleSpeedMax= -1000;
       // this.OBSTACLE_VELOCITY = -45;

        this.planetSpeed = 0.6;
        this.moonSpeed = -0.3;
        

      
        // add background tile sprite
        this.space = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0);
        this.space.tileScaleX = .25;
        this.space.tileScaleY = .25;
        // add background planet
        this.planet = this.add.tileSprite(600, 0, 600, 600, 'planet').setOrigin(0).setScale(.2);  //NEW
        this.planet.tileScaleY= 5;
        this.planet.tileScaleX= 5;
        //add moon
        this.moon = this.add.tileSprite(200, 0, 600, 600, 'moon').setOrigin(0).setScale(.2);  //NEW
        this.moon.tileScaleY= 5;
        this.moon.tileScaleX= 5;
      
        // this.fire =  this.add.tileSprite(0, 0, game.config.width, game.config.height, 'fire').setOrigin(0).setScale(.2); 
       
    	//add score background
    	this.cloud = this.add.sprite(115, 40, 'cloud');
    	//add score text
    	this.space = this.add.text(22, 24, 'Score: 0' , { fontSize: '32px', fill: '#000' });

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height-tileSize, 'groundScroll').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            //console.log(groundTile);
            //groundTile.scaleY = 2;
            this.ground.add(groundTile);
        }

        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize-40, game.config.width, tileSize, 'groundScroll').setOrigin(0);
        this.groundScroll.scaleY = 2;

        // set up dragonGirl
        this.dragonGirl = this.physics.add.sprite(120, game.config.height/2-tileSize, 'dragonGirl').setOrigin(0,0);

        //animation config for dragonGirl
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('fly', {start: 0, end: 5, first:0}),
            frameRate: 30
        });

        //spacebar as input
        spaceBar= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //set up obstacle group and add first obstacle to kick things off
        this.obstacleGroup = this.add.group({
            runChildUpdate: true                 //make sure update runs on group children
        });
        this.addObstacle();
        

        // add physics colliders
        this.physics.add.collider(this.dragonGirl, this.ground);
        this.dragonGirl.body.collideWorldBounds = true;
        //this.physics.add.collider(this.dragonGirl, this.obstacleGroup.children.entries);

        // score display
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 200
        }

        // debugging
        //spriteHeight = this.dragonGirl.

    }

    addObstacle() {
        let obstacle = new Obstacles(this, this.obstacleSpeed); //create new obstacle
        obstacle.body.allowGravity = false;                     //LET IT DEFY GRAVITY   
        this.obstacleGroup.add(obstacle);                       //add it to existing group
    }

    checkCollision(A, B) {
        //simple AABB checking
        /*
        if (A.x < B.x + B.width &&
            A.x + A.width > B.x &&
            A.y < B.y + B.height+1 && 
            A.height + A.y >= B.y+1) {
                return true;
            } else {
                return false;
            }
            */
        if (A.x < B.x + B.displayWidth &&
            A.x + A.displayWidth > B.x &&
            A.y < B.y + B.displayHeight && 
            A.displayHeight + A.y > B.y) {
               return true;
            } 
            else {
                return false;
            }
            
            //if there is a collion between dragon/obstacle trigger gameOver()
           //game.config.physics.arcade.collide(this.dragonGirl, this.obstacleGroup, this.gameOver, null, this);
    }
    
    gameOver() {
       // this.crash.play();
        this.scene.start(Load.js);   

    }

    //resetting planet/moon
    resetPlanet(){
        this.planet.x = 0 - this.planet.displayWidth;
    }
    resetMoon() {
        this.moon.x  = game.config.width;
    }

    update() {
        //debugging area
       // console.log(this.obstacleGroup.children.entries.map( obst => this.checkCollision(this.dragonGirl, obst)).find(element => element == true));
        //console.log(this.obstacleGroup.children.entries);
        //console.log(this.dragonGirl);
        /*
        console.log("Obstacle Width: " + obstacleWidth);
        console.log("Obstacle Height: " + obstacleHeight);
        console.log("Obstacle children: " + this.obstacleGroup);
        console.log("Dragon girl: " + this.dragonGirl); 
        console.log("Dragon girl box: " + this.dragonGirl.body);
        */
        //console.log(this);

        //scroll background planet & moon
        this.planet.x += this.planetSpeed;
        this.moon.x += this.moonSpeed;

        if(this.planet.x >= game.config.width){
            this.resetPlanet();
        }
        if(this.moon.x <= 0 - this.moon.displayWidth){
            this.resetMoon();
        }
       
        // collsion check
        // check obstacleGroup children's collsions against character sprite
        if( this.obstacleGroup.children.entries.map( obst => this.checkCollision(this.dragonGirl, obst)).find(element => element == true)){
            //GAMeOVER
           this.add.image(game.config.width/2, game.config.height/2, 'gameover', this.scoreConfig).setOrigin(0.5).setScale(.45); 
           //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5); 
          
           //RESET TO MENU SCREEN
           // this.clock = this.time.delayedCall(3000, () => {
            //this.scene.start(Load.js);
            //add menu image
            //this.add.image(0, 0, 'menu').setOrigin(0).setScale(.45, .3);
           // this.gameOver();
           // }, null, this);
        }

        // update tile sprites (tweak for more "speed")
        this.space.tilePositionX += this.SCROLL_SPEED;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;

        //dragonGirl can fly!
        this.dragonGirl.anims.play('fly', true);

        // check if dragonGirl is grounded
	    this.dragonGirl.isGrounded = this.dragonGirl.body.touching.down;
	    // if so, we have a jump ready
	    if(this.dragonGirl.isGrounded) {
            this.falling = false;
            this.jumps = 1;
	    } 
        
        //jump
        if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(spaceBar, 800) ) {
            this.dragonGirl.body.velocity.y = this.JUMP_VELOCITY;
            this.falling = false;
        }
        
        //letting go of the UP key pulls dragonGirl down
        if(Phaser.Input.Keyboard.UpDuration(spaceBar)) {
	    	this.jumps--;
            this.falling = true;
            this.dragonGirl.body.allowGravity = true;
        }
        
        //gliding
        if(this.jumps <= 0 && this.falling && spaceBar.isDown) {
            this.dragonGirl.body.velocity.y = this.GLIDE_VELOCITY;
            this.dragonGirl.body.allowGravity = false;
        }
    }

}
