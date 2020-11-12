const { React, getModule, getModuleByDisplayName, i18n: { Messages } } = require('powercord/webpack');
const { AsyncComponent, Clickable } = require('powercord/components');
const { SwitchItem } = require('powercord/components/settings');
const { WEBSITE } = require('powercord/constants');
const { put } = require('powercord/http');

const FormText = AsyncComponent.from(getModuleByDisplayName('FormText'));

let classes;
setImmediate(async () => {
  classes = { ...await getModule([ 'connection', 'integration' ]) };
});

let lastState = null;

module.exports = class ConnectedAccount extends React.PureComponent {
  constructor (props) {
    super(props);

    this.connection = powercord.api.connections.get(props.account.type);
    this.state = lastState || {
      visibility: props.account.visibility
    };
  }

  componentWillUnmount () {
    lastState = this.state;
  }

  handleVisibilityChange (e) {
    const { account } = this.props;
    const value = e.currentTarget.checked ? 1 : 0;
    this.setState({
      visibility: value
    });
    this.setVisibility(account.type, value);
  }

  renderHeader () {
    const { props: { account }, connection } = this;
    return <div className={classes.connectionHeader}>
      <img alt={connection.name} className={classes.connectionIcon} src={connection.icon.color}/>
      <div>
        <FormText className={classes.connectionAccountValue}>{account.name}</FormText>
        <FormText
          className={classes.connectionAccountLabel}
          type='description'
        >
          {connection.name}
        </FormText>
      </div>
      <Clickable
        className={classes.connectionDelete}
        aria-label={Messages.SERVICE_CONNECTIONS_DISCONNECT}
        onClick={this.props.onDisconnect}
      >
        <svg
          aria-hidden="false"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
          />
        </svg>
      </Clickable>
    </div>;
  }

  renderConnectionOptions () {
    return <div className={classes.connectionOptionsWrapper}>
      <div className={classes.connectionOptions}>
        <SwitchItem
          className={classes.connectionOptionSwitch}
          theme={SwitchItem.Themes.CLEAR}
          hideBorder={true}
          fill='rgba(255, 255, 255, .3)'
          value={this.state.visibility === 1}
          onChange={this.handleVisibilityChange.bind(this)}
        >
          <span className={classes.subEnabledTitle}>{Messages.DISPLAY_ON_PROFILE}</span>
        </SwitchItem>
      </div>
    </div>;
  }

  async setVisibility (type, value) {
    if (!powercord.account) {
      return;
    }

    const baseUrl = powercord.settings.get('backendURL', WEBSITE);
    await put(`${baseUrl}/api/v2/users/@me/accounts/${type}`)
      .set('Authorization', powercord.account.token)
      .set('Content-Type', 'application/json')
      .send({ visibility: value });
  }

  render () {
    const { connection } = this;
    return <div className={classes.connection} data-is-powercord="true">
      {this.renderHeader()}
      {typeof this.state.visibility === 'number' && this.renderConnectionOptions()}
    </div>;
  }
};
