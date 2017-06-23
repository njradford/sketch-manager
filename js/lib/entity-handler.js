function EntityHandler() {
  var entityCount = 0;
  this.entities = {};

  this.entityMap = {

  };

  this.addEntity = function (entity) {
	entity.ID = hashForInt(entityCount);
	entityCount ++;
	this.entities[entity.ID] = entity;
	var that = this;
	var keys = Object.keys(entity.components);

	keys.forEach(function (key) {
	  that.mapEntity(entity.components[key].name, entity)
	});
	renderLists();
	return entity.ID;
  };

  this.mapEntity = function (componentName, entity) {
	if (this.entityMap[componentName]) {
	  if (this.entityMap[componentName].indexOf(entity.ID) < 0) {
		this.entityMap[componentName].push(entity.ID);
	  }
	} else {
	  this.entityMap[componentName] = [];
	  if (this.entityMap[componentName].indexOf(entity.ID) < 0) {
		this.entityMap[componentName].push(entity.ID);
	  }
	}
  };

  this.injectComponent = function (entity, component) {
	if (this.entities[entity.ID]) {
	  this.mapEntity(component.name, entity);
	}
	entity.components[component.name] = component;
	renderLists();
  };

  this.removeEntity = function (ID) {
	delete this.entities[ID];
	renderLists();
  };
}