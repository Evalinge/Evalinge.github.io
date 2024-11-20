class ComponentBase{
  constructor(entity){
    this.entity = entity; 
  }
  start(){}
  update(){}
  render(){}
}

class Transform extends ComponentBase{
  constructor(entity, position = {x, y}, rotation = 0, scaleFactor = 1){
    super(entity); 

    this.position = position; 
    this.rotation = rotation; 
    this.scaleFactor = scaleFactor;
  }
}