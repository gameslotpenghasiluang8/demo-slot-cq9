'use babel';

import DemoSlotCq9View from './demo-slot-cq9-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotCq9View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotCq9View = new DemoSlotCq9View(state.demoSlotCq9ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotCq9View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-cq9:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotCq9View.destroy();
  },

  serialize() {
    return {
      demoSlotCq9ViewState: this.demoSlotCq9View.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotCq9 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
