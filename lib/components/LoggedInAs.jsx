/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2014, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

var React = require('react');
var getIn = require('../core/getIn');

var LoggedInAs = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    onLogout: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      loggingOut: false
    };
  },

  render: function() {
    return (
      <p>
        {'Logged in as '}<strong>{this.getName()}</strong>
        {' - '}
        {this.renderLogout()}
      </p>
    );
  },

  renderLogout: function() {
    if (this.state.loggingOut) {
      return <span>Logging out...</span>;
    }

    return <a href="" onClick={this.handleLogout}>Logout</a>;
  },

  getName: function() {
    return getIn(this.props.user, ['profile', 'fullName']);
  },

  handleLogout: function(e) {
    e.preventDefault();
    this.setState({
      loggingOut: true
    });
    var self = this;
    this.props.onLogout(function(err) {
      if (err) {
        self.setState({
          loggingOut: false
        });
      }
    });
  }
});

module.exports = LoggedInAs;
