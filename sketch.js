//Create variables here
var dog,happyDog,food,foodStock,database,foodS,feed,foodStock;
var feedPet,addFood,fedTime,lastFed,foodObj,feedTime;
var foodS = 20;
function preload(){
	Dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
 createCanvas(700,550);
  dog = createSprite(310,350,50,50);
  dog.addImage(Dog);
  dog.scale = 0.15; 
  database = firebase.database();
  console.log(database);
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  food1 = new Food();
  feed = createButton("Feed The Dog");
  feed.position(690,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoodS);
}


function draw() {  
background("lightGreen");
  drawSprites();
  food1.display();
  //add styles here
feedTime = database.ref('feedTime');
feedTime.on("value",function(data){
  lastFed = data.val();
})
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Fed: "+lastFed%12 + "PM",350,30);
}else if(lastFed == 0){
  text("Last Fed:12AM ",350,30);
}else{
  text("Last Fed: "+lastFed + "AM",350,30);
}

food1.display();
drawSprites();
}
function readStock(data){
  foodS = data.val();
  food1.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  if(food1.getFoodStock()<= 0){
    food1.updateFoodStock(food1.getFoodStock()*0);
  }else{
    food1.updateFoodStock(food1.getFoodStock()-1);
  }
  database.ref('/').update({
    food:food1.getFoodStock(),
    feedTime:hour()
  })
}

function addFoodS(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}


function showError(){ 
  console.log("Error in writing to the database");
  }
