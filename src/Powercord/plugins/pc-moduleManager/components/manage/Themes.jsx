const { React, getModule, i18n: { Messages } } = require('powercord/webpack');
const { open: openModal, close: closeModal } = require('powercord/modal');
const { Confirm } = require('powercord/components/modal');
const { TabBar } = require('powercord/components');
const ThemeSettings = require('./ThemeSettings');
const QuickCSS = require('./QuickCSS');
const Base = require('./Base');
const InstalledProduct = require('../parts/InstalledProduct');

class Themes extends Base {
  constructor () {
    super();
    this.state.tab = 'INSTALLED';
    // this.state.settings = 'Customa-Discord';
  }

  render () {
    if (this.state.settings) {
      return (
        <ThemeSettings theme={this.state.settings} onClose={() => this.setState({ settings: null })}/>
      );
    }

    const { topPill, item } = getModule([ 'topPill' ], false);
    return (
      <>
        <div className='powercord-entities-manage-tabs'>
          <TabBar
            selectedItem={this.state.tab}
            onItemSelect={tab => this.setState({ tab })}
            type={topPill}
          >
            <TabBar.Item className={item} selectedItem={this.state.tab} id='INSTALLED'>
              {Messages.MANAGE_USER_SHORTHAND}
            </TabBar.Item>
            <TabBar.Item className={item} selectedItem={this.state.tab} id='QUICK_CSS'>
              {Messages.POWERCORD_QUICKCSS}
            </TabBar.Item>
          </TabBar>
        </div>
        {this.state.tab === 'INSTALLED'
          ? super.render()
          : <QuickCSS openPopout={this.props.openPopout}/>}
      </>
    );
  }

  // eslint-disable-next-line no-unused-vars
  renderItem (item) {
    console.log(item);
    return <InstalledProduct
      product={item.manifest}
      isEnabled={powercord.styleManager.isEnabled(item.entityID)}
      onToggle={async v => {
        await this._toggle(item.entityID, v);
      }}
      onUninstall={() => this._uninstall(item.entityID)}
    />;
  }

  fetchMissing () { // @todo: better impl + i18n
    // noinspection JSIgnoredPromiseFromCall
    powercord.styleManager.get('pc-moduleManager')._fetchEntities('themes');
  }

  _toggle (themeId, enabled) {
    if (enabled) {
      powercord.styleManager.enable(themeId);
    } else {
      powercord.styleManager.disable(themeId);
    }
  }

  getItems () {
    return this._sortItems([ ...powercord.styleManager.themes.values() ].filter(t => t.isTheme));
  }
}

module.exports = Themes;
