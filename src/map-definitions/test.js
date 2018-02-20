var Person = (function() {
  var protectedMembers;
  var priv = new WeakMap();

  var  _ = function (inst) {
    return priv.get(inst);
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function PersonConstructor(name, surname, protected2) {
    protectedMembers = protected2 || {};
    var test = "cipeczka";
    protectedMembers.capitalize = capitalize;

    this.name = capitalize(name);
    this.surname = capitalize(surname);
    priv.set(this, protected2);
  }

  PersonConstructor.prototype.sayName = function(){
    console.log(_(this).name);
  }

  return PersonConstructor;
}());

var Developer = (function(){

  var priv = new WeakMap();

  var  _ = function (inst) {
    return priv.get(inst);
  }

  function DeveloperConstructor(name, surname, knownLanguage,rr) {
    var parentProtected = {
      name:rr
    };
    Person.call(this, name, surname, parentProtected);
    var test = rr;
    priv.set(this, test);
    this.knownLanguage = parentProtected.capitalize(knownLanguage);

  }
  DeveloperConstructor.prototype = Object.create(Person.prototype);
  DeveloperConstructor.prototype.constructor = DeveloperConstructor;
  DeveloperConstructor.prototype.test2 = function () {
    console.log(_(this));

  }



  return DeveloperConstructor;

})();


function test() {

  var dev1 = new Developer("dsd","dsd", "dsd", "jonasz");

  var dev2 = new Developer("dsd","dsd", "dsd", "zenek");
  dev1.sayName();
//dev1.test2();
  dev2.sayName();

}
export default  Developer;
export { Person }
