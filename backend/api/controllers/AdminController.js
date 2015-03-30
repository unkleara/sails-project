/**
* AdminController
*
* @description :: Server-side logic for managing Admins
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {
	index: function(req, res) {


		var configuredModels;

		function defaultModelDefs() {
			var defs = {};
			Object.keys(sails.models).filter(function(modelName) {
				return sails.controllers.hasOwnProperty(modelName);
			}).forEach(function(modelName) {
				defs[modelName] = {};
			});
			return defs;
		}

		function buildFieldsArray(attributes, configFields) {
			return Object.keys(configFields).map(function(fieldName) {
				console.log(attributes[fieldName]);
				return  _.extend(
					configFields[fieldName], {
						name: fieldName
					});
				});
			}

			configuredModels = sails.config.ngAdmin.models; //|| defaultModelDefs();

			function generateModels() {
				return Object.keys(configuredModels).map(function gatherModelProperties(modelName) {
					var model = sails.models[modelName],
					fields = buildFieldsArray(model._attributes, configuredModels[modelName].fields),
					ngaModel = {
						modelName: modelName,
						primaryKey: model.primaryKey,
						primaryField: configuredModels[modelName].primaryField,
						fields: configuredModels[modelName].fields
					};

					return ngaModel;
				});
			}

			console.log(generateModels());
			res.locals.layout = '';
			res.view('ng-admin', { adminConfig: generateModels() });
		}
	};
