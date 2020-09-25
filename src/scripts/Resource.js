class Resource {
  constructor(name, type, val, quantity) {
    this.resourceName = name;
    this.resourceType = type;
    this.value = val;
    this.quantity = quantity;
  }
  SetQuantity(amt) {
    this.quantity = amt;
  }
}

class Cash extends Resource {
  constructor(quantity = 500) {
    super("Cash", Cash, 1, quantity);
  }
}

class Carrot extends Resource {
  constructor(quantity) {
    super("Carrot", Carrot, 0.3, quantity);
  }
}

class Pig extends Resource {
  constructor(quantity) {
    super("Pig", Pig, 150, quantity);
  }
}

class Potato extends Resource {
  constructor(quantity) {
    super("Potato", Potato, 0.5, quantity);
  }
}

export { Potato, Pig, Carrot, Cash };