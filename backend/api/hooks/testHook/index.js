module.exports = function testHook(sails) {

   // This var will be private
   var foo = 'bar';

   // This var will be public
   this.abc = 123;

   return {

      // This function will be public
      sayHi: function (name) {
         console.log(greet(name));
      }

   };

   // This function will be private
   function greet (name) {
      return "Hi, " + name + "!";
   }

};
