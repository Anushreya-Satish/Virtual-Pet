var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedTheDog;
var foodObj;
var bg;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Chase.png");
happyDog=loadImage("Happy Chase.png");
bg = loadImage("Bg.jpg");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(650,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.3;

  //create feed the dog button here
  feedTheDog=createButton("Feed Chase");
  feedTheDog.position(650,95);
  feedTheDog.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(bg);
  foodObj.display();

  //write code to display text lastFed time here
  if(lastFed>=12){
  noStroke();
  fill("black");
  textSize(20);
  textFont("Arial");
  text("Last Fed: 12 PM", 300,30)
  }else if(lastFed===0){
    noStroke();
    fill("black");
    textSize(20);
    textFont("Arial");
    text("Last Fed: 8 AM",300,30)
  }else{
    noStroke();
    fill("black");
    textSize(20);
    textFont("Arial");
    text("Last Fed: 8 PM",300,30)
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  dog.scale = 0.2;
  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
