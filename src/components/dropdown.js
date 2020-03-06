import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownItem, Collapse, Card } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import './dropdown.css'
class dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }
  render() {

    return (
      <Dropdown toggle={this.toggle}>
      
        <DropdownToggle caret>
        <p>
          {this.props.location.pathname.slice(1)}
        </p>
        </DropdownToggle>
        <Collapse isOpen={this.state.isOpen}>
      
        <Card>
          <DropdownItem>
            <Link to='/Kaikki kaupungit'>Kaikki kaupungit</Link>
          </DropdownItem>
          <DropdownItem>
          <Link to='/Tampere'>Tampere</Link>
          </DropdownItem>
          <DropdownItem>
          <Link to='/Kuopio'>Kuopio</Link>
          </DropdownItem>
          <DropdownItem>
          <Link to='/Jyväskylä'>Jyväskylä</Link>
          </DropdownItem>
          <DropdownItem>
          <Link to='/Helsinki'>Helsinki</Link>
          </DropdownItem>
        </Card>
        </Collapse>
      </Dropdown>
    )
  }
}
export default withRouter(dropdown);