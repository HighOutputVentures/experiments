import User from '../user/icon';


/**
 * A provider for quick service task production
 */
export default function UserPaletteProvider(palette, create, elementFactory) {

  this._create = create;
  this._elementFactory = elementFactory;

  palette.registerProvider(this);
}

UserPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory'
];

UserPaletteProvider.prototype.getPaletteEntries = function() {

  var elementFactory = this._elementFactory,
      create = this._create;

  function startCreate(event) {
    var serviceTaskShape = elementFactory.create(
      'shape', { type: 'bpmn:ServiceTask' }
    );

    create.start(event, serviceTaskShape);
  }

  return {
    'create-service-task': {
      group: 'activity',
      title: 'Create a new user!',
      imageUrl: User.dataURL,
      action: {
        dragstart: startCreate,
        click: startCreate
      }
    }
  };
};