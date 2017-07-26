Tareas = new Mongo.Collection('tareas');

if (Meteor.isClient) {
  Meteor.subcribe('tareas');

  Templete.tareas.helpers({
    tareas: function(){
      return Tareas.find({}, {sort: {createAt: -1}});
    }
  });

  Templete.tareas.events({
    "submit .añadir-tareass": function(events){
      var name = event.target.name.value;
      
      Tareas.insert({
        name: name,
        createAt: new Date(),
        userId: Meteor.userId
      });
      
      event.target.name.value = '';

      return false;
    },
    "click .eliminar-tareas": function(event){
      if(confirm('Eliminar Tarea?')){
        Tareas.remove(this_id);
      }
      return false;
    }
  })

}

if (Meteor.isServer) {
  Meteor.publish('tareas', function(){
    return Tareas.find({userId: this.userId()});
  });
}
Meteor.methods({
  añadirTarea: function(name){
    if(!Meteor.userId()){
      throw new Meteor.Error('No Accedio!');
    }

    Task.insert({
      name: name,
      createAt: new Date(),
      userId: Meteor.userId()
    });
  },
  eliminarTarea: function(tareaid){
    Task.remove(tareaId);
  }
})