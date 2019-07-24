import React, { Component } from "react";
class PeopleTrustedUser extends Component {
 constructor(props) {
   super();
   this.state = {
     toUserId: props.userId,
     trustedUsersList: [],
     isLoaded: false
   };
 }
 componentDidMount = () => {
   this.getTrustedUsers();
 };
 getTrustedUsers = async () => {
   const data = await fetch(`/api/users/${this.state.toUserId}/trustedUsers`);
   const trustedUsers = await data.json();
   this.setState({ trustedUsersList: trustedUsers, isLoaded: true });
   console.log(trustedUsers);
 };
 render() {
   const { trustedUsersList } = this.state;
   const trustedUsers = trustedUsersList.map(user => (
     <>
    <div class="chip chip-md mb-3">
        <img src={user.photo} alt="Contact Person" /> <span className="font-weight-bold teal-text mb-10">{`${user.first_name} ${user.last_name}`}</span>
    </div>
    
     </>
   ));
   return <div>{trustedUsers}</div>;
 }
}
export default PeopleTrustedUser;